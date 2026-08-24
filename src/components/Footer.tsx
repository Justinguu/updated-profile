import AIChatButton from "./AIChatButton";

// The chat route needs both of these to answer. If either is missing, the
// button is not rendered at all rather than showing a chatbot that can't reply.
const chatEnabled =
  !!process.env.SUPABASE_URL && !!process.env.OPENAI_API_KEY;

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground">
        <span>© {new Date().getFullYear()} Jung Gu</span>
        <span>
          Built with Next.js
          {chatEnabled && " · Ask the chatbot anything about me ↘"}
        </span>
      </div>
      {chatEnabled && <AIChatButton />}
    </footer>
  );
}
