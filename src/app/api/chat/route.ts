import OpenAI from "openai";
import { StreamingTextResponse } from "ai";
import resumeData from "@/data/resumeData.json";

/**
 * The "Ask about me" chat. No database: the resume is small enough to sit in
 * the prompt whole, so the model answers from the same JSON that renders the
 * site and the PDF. Change resumeData.json and the bot knows on the next deploy.
 */
export const runtime = "nodejs";

const { personalInfo, experience, education, skillGroups, languages } = resumeData;

const bullets = (d: string) => d.split("\n").map((l) => l.replace(/^•\s*/, "").trim()).filter(Boolean);

const record = [
  `Name: ${personalInfo.name} (goes by Justin). Title: ${personalInfo.title}. Location: ${personalInfo.location}.`,
  `Email: ${personalInfo.email}. Phone: ${personalInfo.phone}. GitHub: ${personalInfo.github}. LinkedIn: https://${personalInfo.linkedin}. Site: https://${personalInfo.website}.`,
  `Summary: ${personalInfo.summary}`,
  "",
  "Work experience:",
  ...experience.flatMap((j) => [
    `- ${j.position} at ${j.company}, ${j.startDate} to ${j.endDate}.`,
    ...bullets(j.description).map((b) => `  * ${b}`),
  ]),
  "",
  "Education:",
  ...education.map((e) => `- ${e.institution}: ${e.degree}, ${e.startDate} to ${e.endDate}.${e.description ? " " + e.description : ""}`),
  "",
  "Technical skills:",
  ...skillGroups.map((g) => `- ${g.name}: ${g.items.join(", ")}`),
  "",
  `Languages: ${languages.map((l) => `${l.language} (${l.proficiency})`).join(", ")}.`,
  "",
  "How I work: I take features end to end, from schema and migration through UI, pipeline and rollout, and keep them running after they ship. I work daily with IT, customer support, operations managers and division managers. Every feature is tested thoroughly and schema changes run against a staging copy before production. Cutovers come with a runbook and scheduled jobs with a control panel.",
  "Writing: I keep notes from the build at https://jgu-portfolio.vercel.app/blog, on zero-downtime deploys with Azure App Service slot swaps, moving scheduled jobs to Azure Container Apps Jobs, and LLM analytics that never write SQL.",
  "Availability: open to full-time engineering roles and contract work. Email is the fastest way to reach me.",
].join("\n");

const systemPrompt = `You are the assistant on Jung "Justin" Gu's portfolio site, answering visitors (usually recruiters and engineers) on his behalf. Speak in first person as Justin.

Rules:
- Answer only from the record below. If it does not contain the answer, say so plainly and point to the resume page (/resume), the blog (/blog), GitHub or LinkedIn, or suggest emailing me.
- Never invent employers, dates, numbers, degrees, certifications or technologies.
- Be concise: a short paragraph or a few bullets, under 150 words unless asked for detail. Plain language, no hype.
- Use markdown links for the resume (/resume), the blog (/blog), GitHub (${personalInfo.github}) and LinkedIn (https://${personalInfo.linkedin}).
- Do not share the phone number unless asked for it directly; email is the preferred contact.

Record:
${record}`;

const MAX_TURNS = 12;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "Chat is not configured." }, { status: 503 });
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const history = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content.slice(0, 4000) }));

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return Response.json({ error: "Send a message to answer." }, { status: 400 });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      temperature: 0.3,
      max_tokens: 500,
      messages: [{ role: "system", content: systemPrompt }, ...history],
    });
    // Plain text chunks; useChat in this version of the ai package reads exactly that.
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (error) {
          console.error("[chat] stream interrupted:", error);
        } finally {
          controller.close();
        }
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("[chat] OpenAI request failed:", error);
    return Response.json({ error: "The assistant is unavailable right now." }, { status: 502 });
  }
}
