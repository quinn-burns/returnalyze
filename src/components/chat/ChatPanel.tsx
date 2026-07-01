"use client";

/*
 * "Clarity" AI chat panel — Figma node 1801:8734.
 * Rendered as an overlay anchored bottom-right when the chat FAB is open.
 */

const PARAGRAPH =
  "Lorem ipsum dolor sit amet consectetur. Sem magna elementum amet amet. Aliquam arcu dignissim accumsan nisl ligula enim turpis. Sit purus phasellus erat sapien senectus mi. Nibh ac bibendum habitant feugiat augue nulla. Augue in platea massa diam tortor et turpis molestie. Quam a in sed vehicula. Ac vel aliquet luctus mi eu.";

function MoreVert() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/chat/more-vert.svg" alt="" className="size-6 shrink-0 opacity-60" />
  );
}

function ResultTable() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-neutral-200">
      <div className="flex bg-primary-50">
        {["Title", "Title", "Title"].map((t, i) => (
          <div key={i} className="flex-1 p-2 text-sm font-medium text-neutral-800">
            {t}
          </div>
        ))}
      </div>
      {[false, true].map((tinted, r) => (
        <div key={r} className={`flex ${tinted ? "bg-neutral-50" : "bg-white"}`}>
          {[0, 1, 2].map((c) => (
            <div key={c} className="flex-1 p-2 text-sm text-neutral-800">
              Lorem ipsum
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="Clarity assistant"
      className="fixed bottom-4 right-4 z-50 flex h-[min(696px,calc(100dvh-2rem))] w-[min(595px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl shadow-[0px_8px_40px_rgba(0,0,0,0.12),0px_4px_20px_7px_rgba(0,0,0,0.06)] [background:radial-gradient(120%_90%_at_100%_0%,#ebefff_0%,#ffffff_55%)]"
    >
      {/* Header */}
      <div className="flex items-start gap-2 bg-white p-4 shadow-[0px_8px_40px_-16px_rgba(0,0,51,0.06)]">
        <div className="flex flex-1 items-center gap-2">
          <div className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/chat/clarity-logo.svg" alt="" className="size-8" />
            <span className="text-xl font-medium text-neutral-800">Clarity</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/chat/arrows-more-up.svg" alt="" className="size-6 opacity-70" />
        </div>
        <button type="button" aria-label="Close chat" onClick={onClose}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/chat/close.svg" alt="" className="size-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto py-4">
        {/* Bot response with table */}
        <div className="flex flex-col pl-4 pr-12">
          <div className="flex w-full items-start gap-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl border border-[#e9ecff] bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/chat/bot-logo.svg" alt="" className="size-6 shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="text-base font-medium text-neutral-800">Heading</p>
              <p className="text-sm text-neutral-800">{PARAGRAPH}</p>
              <ResultTable />
            </div>
            <MoreVert />
          </div>
        </div>

        {/* Highlighted response */}
        <div className="flex flex-col pl-12 pr-4">
          <div className="flex w-full items-start gap-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl border border-primary-400 bg-primary-50 p-4">
            <p className="min-w-0 flex-1 text-sm text-neutral-800">{PARAGRAPH}</p>
            <MoreVert />
          </div>
        </div>

        {/* Recommended prompts */}
        <div className="flex gap-4 px-4">
          {[0, 1].map((i) => (
            <button
              key={i}
              type="button"
              className="flex min-w-0 flex-1 items-center gap-1 rounded-2xl border border-[#e9ecff] bg-white p-4 text-left transition-colors hover:bg-primary-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/chat/send-sm.svg" alt="" className="size-6 shrink-0" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-primary-600">
                Recommended prompt
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer input */}
      <div className="px-4 pb-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex h-[72px] items-center justify-between gap-2 rounded-2xl border-2 border-[#a3b1ff] bg-white px-4"
        >
          <input
            type="text"
            placeholder="Ask Clarity anything..."
            className="min-w-0 flex-1 bg-transparent text-base text-neutral-700 placeholder:text-neutral-700 focus:outline-none"
          />
          <button type="submit" aria-label="Send message" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/chat/send-lg.svg" alt="" className="size-8" />
          </button>
        </form>
      </div>
    </div>
  );
}
