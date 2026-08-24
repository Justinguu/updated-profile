"use client";

import { MessageSquare, X } from "lucide-react";
import { useState } from "react";
import AIChatBox from "./AIChatBox";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setChatBoxOpen((o) => !o)}
        aria-label={chatBoxOpen ? "Close chat" : "Ask Justin's assistant"}
        className="fixed bottom-5 right-5 z-40 flex h-12 items-center gap-2 rounded-full bg-foreground pl-4 pr-5 text-sm font-medium text-background shadow-lg transition-transform hover:-translate-y-0.5"
      >
        {chatBoxOpen ? <X className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
        <span className="hidden sm:inline">{chatBoxOpen ? "Close" : "Ask about me"}</span>
      </button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
}
