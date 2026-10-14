import AIChatButton from "./AIChatButton";
import resumeData from "@/data/resumeData.json";

/**
 * The chat answers from the resume JSON with one OpenAI call, so the only
 * thing it needs is the key. Switched off for now: the OpenAI account has no
 * credits, so the button would only show visitors an error. Flip CHAT_ENABLED
 * to true once billing is sorted; the route and the chat box are untouched.
 */
const CHAT_ENABLED = false;

export default function Footer() {
  const chatEnabled = CHAT_ENABLED && !!process.env.OPENAI_API_KEY;
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
