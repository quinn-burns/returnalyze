"use client";

/*
 * Floating help/chat button — Figma node 1801:7211 ("dark").
 * 54px circle, teal→blue vertical gradient, chat-bubble logo. Pinned to the
 * bottom-right of the viewport; clicking it opens the "Clarity" chat panel.
 */
import { useState } from "react";
import ChatPanel from "./chat/ChatPanel";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  if (open) return <ChatPanel onClose={() => setOpen(false)} />;

  return (
    <button
      type="button"
      aria-label="Open help & chat"
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-40 flex size-[54px] items-center justify-center rounded-full bg-gradient-to-b from-[#27cba7] to-[#0b61dd] p-2 shadow-[0px_4px_16px_-8px_rgba(0,0,0,0.1),0px_3px_12px_-4px_rgba(0,0,0,0.1),0px_2px_3px_-2px_rgba(0,0,51,0.06),0px_0px_0px_1px_rgba(0,0,51,0.06)] transition-transform hover:scale-105 active:scale-95"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/overview/fab-logo.svg" alt="" className="size-[38px]" />
    </button>
  );
}
