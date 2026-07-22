"use client";

import { Card, CardHeading, TakeAction } from "./parts";

/* ----------------------------- data ----------------------------- */

/* Every figure below is lifted from the tab it links to, so a headline here can
   never disagree with the table it drills into. */

type Trend = "good" | "bad" | "flat";
const HEALTH: { label: string; value: string; note: string; trend: Trend }[] = [
  { label: "Return Rate (V)", value: "14.76%", note: "↓ 2.0 pts vs LY", trend: "good" },
  { label: "Returns from Bracketing", value: "30.84%", note: "↓ 0.9 pts vs LY", trend: "good" },
  { label: "Same-Style Exchange Rate", value: "4.4%", note: "of returns recovered", trend: "bad" },
  { label: "Unprofitable Customers", value: "836", note: "$1.5M return revenue", trend: "bad" },
  { label: "Repurchase After Kept-All", value: "74%", note: "vs 41% after returned-all", trend: "good" },
];

type Bar = { label: string; value: number; display: string; color: string };
type Insight = {
  source: string;
  tab: string;
  anchor: string;
  finding: string;
  figure: string;
  figureNote: string;
  bars: Bar[];
  /** Signed bars diverge from a centre line rather than growing from the left. */
  signed?: boolean;
  context: string;
  department: string;
};

const INSIGHTS: Insight[] = [
  {
    source: "Bracketing",
    tab: "Bracketing",
    anchor: "bracketing-profit",
    finding: "Size is the only bracketing type losing money",
    figure: "−$7",
    figureNote: "profit per size-bracketed order, against +$44 for colour",
    bars: [
      { label: "Colour", value: 44, display: "+$44", color: "#059467" },
      { label: "Both", value: 21, display: "+$21", color: "#27cba7" },
      { label: "Size", value: -7, display: "−$7", color: "#dc2828" },
    ],
    signed: true,
    context: "Bracketing",
    department: "Size bracketing",
  },
  {
    source: "Exchange",
    tab: "Exchange",
    anchor: "exchange-promote",
    finding: "Almost no returns are being recovered as exchanges",
    figure: "4.4%",
    figureNote: "of returns become a same-style exchange — $41K of size upside sits in five departments",
    bars: [
      { label: "Light Hike", value: 15, display: "$15K", color: "#4169e1" },
      { label: "Running", value: 11, display: "$11K", color: "#4169e1" },
      { label: "Casual", value: 6, display: "$6K", color: "#4169e1" },
      { label: "Originals", value: 6, display: "$6K", color: "#4169e1" },
      { label: "Trail Running", value: 3, display: "$3K", color: "#4169e1" },
    ],
    context: "Exchange",
    department: "Light Hike",
  },
  {
    source: "Segments",
    tab: "Segments",
    anchor: "segments-impact",
    finding: "A small group of customers carries most of the loss",
    figure: "836",
    figureNote: "unprofitable customers returning 48% of what they buy, worth $1.5M",
    bars: [
      { label: "High return rate", value: 41, display: "$4.1M", color: "#4169e1" },
      { label: "No repurchase (new)", value: 43, display: "$4.3M", color: "#4169e1" },
      { label: "Unprofitable", value: 15, display: "$1.5M", color: "#dc2828" },
      { label: "Likely resellers", value: 7.4, display: "$743K", color: "#4169e1" },
    ],
    context: "Segments",
    department: "Unprofitable Customers",
  },
  {
    source: "Behavioral Flow",
    tab: "Behavioral Flow",
    anchor: "flow-sankey",
    finding: "Keeping the whole order is the strongest signal they come back",
    figure: "74%",
    figureNote: "of kept-all customers buy again, against 41% of those who returned everything",
    bars: [
      { label: "Kept all", value: 74, display: "74%", color: "#059467" },
      { label: "Kept some", value: 58, display: "58%", color: "#f59f0a" },
      { label: "Returned all", value: 41, display: "41%", color: "#dc2828" },
    ],
    context: "Behavioral Flow",
    department: "Repeat purchase",
  },
];

type Action = {
  title: string;
  why: string;
  impact: string;
  weight: "High" | "Medium";
  source: string;
  tab: string;
  anchor: string;
  context: string;
  department: string;
};

const ACTIONS: Action[] = [
  {
    title: "Put size guidance on the styles customers bracket most",
    why: "111K orders bracket on size and each one loses $7, while colour bracketing earns $44.",
    impact: "Largest margin lever",
    weight: "High",
    source: "Bracketing",
    tab: "Bracketing",
    anchor: "bracketing-profit",
    context: "Bracketing",
    department: "Size bracketing",
  },
  {
    title: "Promote size exchanges in Light Hike and Running",
    why: "Your two biggest departments by revenue have among the lowest size-exchange rates.",
    impact: "$26K identified",
    weight: "High",
    source: "Exchange",
    tab: "Exchange",
    anchor: "exchange-promote",
    context: "Exchange",
    department: "Light Hike",
  },
  {
    title: "Stop promoting to the 836 unprofitable customers",
    why: "They return 48% of what they buy — marketing spend here funds its own returns.",
    impact: "$1.5M exposure",
    weight: "High",
    source: "Segments",
    tab: "Segments",
    anchor: "segments-impact",
    context: "Segments",
    department: "Unprofitable Customers",
  },
  {
    title: "Review the 1,947 accounts flagged as likely resellers",
    why: "A 59.7% return rate, the highest of any segment you track.",
    impact: "$743K",
    weight: "Medium",
    source: "Segments",
    tab: "Segments",
    anchor: "segments-impact",
    context: "Segments",
    department: "Likely Resellers",
  },
  {
    title: "Build a win-back list from kept-all customers",
    why: "They repurchase at 74%, so they are the cheapest repeat revenue you have.",
    impact: "Retention",
    weight: "Medium",
    source: "Behavioral Flow",
    tab: "Behavioral Flow",
    anchor: "flow-sankey",
    context: "Behavioral Flow",
    department: "Repeat purchase",
  },
];

/* --------------------------- sections ---------------------------- */

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One click from any headline to the table it came from. */
function SeeData({ label = "See the data", onClick }: { label?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium text-primary-600 transition-colors hover:text-primary-700"
    >
      {label}
      <ArrowRight />
    </button>
  );
}

function HealthStrip() {
  const tone: Record<Trend, string> = {
    good: "text-success-600",
    bad: "text-danger-600",
    flat: "text-neutral-600",
  };
  return (
    <div className="grid grid-cols-2 rounded-lg border border-neutral-200 bg-neutral-0 sm:grid-cols-3 lg:grid-cols-5">
      {HEALTH.map((k) => (
        <div key={k.label} className="flex flex-col gap-1.5 p-4">
          <p className="text-xs text-neutral-600">{k.label}</p>
          <p className="text-[28px] font-bold leading-[34px] text-neutral-800">{k.value}</p>
          <p className={`text-xs font-medium ${tone[k.trend]}`}>{k.note}</p>
        </div>
      ))}
    </div>
  );
}

function MiniBars({ bars, signed }: { bars: Bar[]; signed?: boolean }) {
  const max = Math.max(...bars.map((b) => Math.abs(b.value)));
  return (
    <div className="flex flex-col gap-2">
      {bars.map((b) => {
        const pct = (Math.abs(b.value) / max) * (signed ? 50 : 100);
        return (
          <div key={b.label} className="flex items-center gap-2.5">
            <span className="w-[104px] shrink-0 truncate text-xs text-neutral-600">{b.label}</span>
            <span className="relative h-4 flex-1 overflow-hidden rounded bg-neutral-100">
              {signed ? <span className="absolute inset-y-0 left-1/2 w-px bg-neutral-200" /> : null}
              <span
                data-anim-bar
                className="absolute inset-y-0 rounded"
                style={{
                  backgroundColor: b.color,
                  width: `${pct}%`,
                  left: signed ? (b.value < 0 ? `${50 - pct}%` : "50%") : 0,
                }}
              />
            </span>
            <span className="w-12 shrink-0 text-right text-xs font-semibold text-neutral-800">
              {b.display}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function InsightCard({ insight, onGo }: { insight: Insight; onGo: () => void }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-primary-600">
        {insight.source}
      </span>
      <h3 className="text-base font-semibold leading-snug text-neutral-800">{insight.finding}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-[32px] font-bold leading-none text-neutral-800">{insight.figure}</span>
      </div>
      <p className="text-xs leading-relaxed text-neutral-600">{insight.figureNote}</p>
      <div className="mt-1">
        <MiniBars bars={insight.bars} signed={insight.signed} />
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-neutral-150 pt-3">
        <SeeData onClick={onGo} />
        <TakeAction context={insight.context} department={insight.department} />
      </div>
    </Card>
  );
}

function SuggestedActions({ onGo }: { onGo: (tab: string, anchor: string) => void }) {
  return (
    <Card>
      <CardHeading
        title="Suggested actions"
        subtitle="Ranked by what the data says is costing the most right now. Each one links back to the evidence behind it."
      />
      <ol className="mt-3 flex flex-col">
        {ACTIONS.map((a, i) => (
          <li
            key={a.title}
            className="flex flex-wrap items-start gap-x-4 gap-y-2 border-b border-primary-50 py-3 last:border-b-0"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-600">
              {i + 1}
            </span>
            <div className="min-w-[240px] flex-1">
              <p className="text-sm font-medium text-neutral-800">{a.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-neutral-600">{a.why}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                  a.weight === "High"
                    ? "bg-danger-50 text-danger-600"
                    : "bg-amber-50 text-warning-600"
                }`}
              >
                {a.impact}
              </span>
              <SeeData label="Why this?" onClick={() => onGo(a.tab, a.anchor)} />
              <TakeAction context={a.context} department={a.department} />
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

/* ------------------------------ tab ------------------------------ */

export default function OverviewTab({
  onGo,
}: {
  onGo: (tab: string, anchor?: string) => void;
}) {
  return (
    <>
      <HealthStrip />
      <div>
        <h2 className="text-base font-semibold text-neutral-800">What needs attention</h2>
        <p className="text-sm text-neutral-600">
          The clearest finding from each area, with a way through to the detail behind it.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {INSIGHTS.map((it) => (
          <InsightCard key={it.source} insight={it} onGo={() => onGo(it.tab, it.anchor)} />
        ))}
      </div>
      <SuggestedActions onGo={onGo} />
    </>
  );
}
