import { lookup } from "node:dns/promises";
import AIChatButton from "./AIChatButton";
import resumeData from "@/data/resumeData.json";

/**
 * The chat route needs Supabase (vector store) and OpenAI to answer. The
 * button is rendered only when both are configured AND the Supabase host
 * actually resolves. This runs at build time (the layout is static), so a
 * deleted or paused Supabase project hides the chat on the next deploy
 * instead of showing visitors a button that hangs.
 */
async function chatBackendReachable(): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  if (!url || !process.env.OPENAI_API_KEY) return false;
  try {
    await lookup(new URL(url).host);
    return true;
  } catch {
    console.warn("[footer] Supabase host does not resolve; hiding the chat button.");
    return false;
  }
}

/** The last line on every page ends on the person, not the framework. */
export default async function Footer() {
  const chatEnabled = await chatBackendReachable();
  const { personalInfo } = resumeData;

  return (
    <footer className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground">
        <span>
          {personalInfo.name} · {personalInfo.location} ·{" "}
          <a href={`mailto:${personalInfo.email}`} className="transition-colors hover:text-foreground">
            {personalInfo.email}
          </a>
        </span>
        <span>© {new Date().getFullYear()}</span>
      </div>
      {chatEnabled && <AIChatButton />}
    </footer>
  );
}
