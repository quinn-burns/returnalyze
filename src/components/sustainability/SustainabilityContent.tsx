"use client";

import { ActionModalProvider } from "../customer/ActionSubmit";
import { AiInsight, Card, CardHeading, KpiStrip, TakeAction } from "../customer/parts";
import { BRAND_OPTS, CATEGORY_OPTS, COUNTRY_OPTS, PERIOD_OPTS, FilterSelect } from "../customer/filters";

/* ----------------------------- data ----------------------------- */

const KPIS = [
  { label: "Value Recovered", sub: "product kept in use", value: "$18.4M" },
  { label: "Value Written Off", sub: "lost to disposal", value: "$1.2M" },
  { label: "Return Logistics Cost", sub: "ship + process", value: "$4.6M" },
  { label: "Cost per Return", sub: "all-in", value: "$32" },
  { label: "Return Emissions", sub: "t CO₂e this period", value: "1,240" },
];

// Disposition of returned product, valued. Recovery rate = share of original
// retail value recouped. Landfill recovers nothing and still costs to haul.
const DISPOSITION = [
  { label: "Restocked as new", value: "$13.2M", items: "72%", recovery: "98% of value", amount: 13.2, color: "#059467" },
  { label: "Resold · Used Gear", value: "$2.6M", items: "11%", recovery: "61% of value", amount: 2.6, color: "#27cba7" },
  { label: "Repaired · ReBIRD", value: "$1.9M", items: "8%", recovery: "74% of value", amount: 1.9, color: "#1d97ff" },
  { label: "Recycled", value: "$0.4M", items: "5%", recovery: "12% of value", amount: 0.4, color: "#f59f0a" },
  { label: "Donated", value: "$0.1M", items: "2%", recovery: "tax value only", amount: 0.1, color: "#4169e1" },
  { label: "Landfill", value: "−$0.3M", items: "2%", recovery: "no value + haul fees", amount: 0.3, color: "#dc2828" },
];

// What the returns process costs, with the carbon that rides along with it.
const COSTS = [
  { label: "Return shipping", cost: "$2.9M", pct: 63, carbon: "781 t CO₂e" },
  { label: "Processing & warehousing", cost: "$1.1M", pct: 24, carbon: "223 t CO₂e" },
  { label: "Repackaging & materials", cost: "$0.4M", pct: 9, carbon: "136 t CO₂e" },
  { label: "Disposal & recycling", cost: "$0.2M", pct: 4, carbon: "100 t CO₂e" },
];

// Science-based targets, each priced by what closing the gap is worth.
const TARGETS = [
  {
    label: "Scope 3 emissions reduction",
    current: 31,
    goal: 42,
    status: "31% of the 42% cut by 2030",
    worth: "$2.1M/yr cost avoided at target",
  },
  {
    label: "Waste diverted from landfill",
    current: 87,
    goal: 95,
    status: "87% today · 95% by 2030",
    worth: "$680K/yr value recovered",
  },
  {
    label: "Returns kept in circulation",
    current: 76,
    goal: 90,
    status: "76% today · 90% by 2030",
    worth: "$3.4M/yr margin retained",
  },
];

type CatRow = {
  category: string;
  returns: string;
  rate: string;
  cost: string;
  carbon: string;
  share: number;
};
const BY_CATEGORY: CatRow[] = [
  { category: "Outerwear", returns: "38.2K", rate: "18.4%", cost: "$1.6M", carbon: "412 t", share: 100 },
  { category: "Footwear", returns: "44.1K", rate: "22.1%", cost: "$1.4M", carbon: "356 t", share: 86 },
  { category: "Hike", returns: "21.7K", rate: "12.9%", cost: "$780K", carbon: "198 t", share: 48 },
  { category: "Climb", returns: "14.3K", rate: "11.2%", cost: "$556K", carbon: "141 t", share: 34 },
  { category: "Accessories", returns: "9.8K", rate: "9.4%", cost: "$308K", carbon: "78 t", share: 19 },
];

type OppRow = { dept: string; lever: string; savings: string; payback: string; carbon: string };
const OPPORTUNITIES: OppRow[] = [
  { dept: "Footwear", lever: "Reduce size bracketing", savings: "$1.4M / yr", payback: "4 mo", carbon: "180 t CO₂e" },
  { dept: "Outerwear", lever: "Cut re-return exchanges", savings: "$820K / yr", payback: "6 mo", carbon: "96 t CO₂e" },
  { dept: "Hike", lever: "Consolidate return shipping", savings: "$510K / yr", payback: "3 mo", carbon: "64 t CO₂e" },
  { dept: "Accessories", lever: "Restock instead of recycle", savings: "$240K / yr", payback: "2 mo", carbon: "22 t CO₂e" },
];

/* --------------------------- sections ---------------------------- */

function Header() {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4 bg-neutral-0 px-4 py-6">
      <div className="flex flex-col justify-center">
        <h1 className="text-[36px] font-bold leading-tight text-neutral-800">Sustainability</h1>
        <p className="text-sm text-neutral-600">
          What returns cost you in margin and carbon — and the value you recover by keeping product
          in use
        </p>
      </div>
    </header>
  );
}

function FilterBar() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <FilterSelect label="Brand" options={BRAND_OPTS} />
      <FilterSelect label="Country" options={COUNTRY_OPTS} />
      <FilterSelect label="Product Category" options={CATEGORY_OPTS} />
      <FilterSelect label="Period" options={PERIOD_OPTS} />
    </div>
  );
}

function MissionBanner() {
  const goals = [
    { value: "Net-zero", label: "value chain by 2050" },
    { value: "−42%", label: "Scope 3 by 2030" },
    { value: "−90%", label: "Scope 1 & 2 by 2030" },
    { value: "$6.2M", label: "margin tied to these goals" },
  ];
  return (
    <section className="overflow-hidden rounded-lg border border-success-100 bg-success-50 p-5">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-success-600">
          <span
            aria-hidden="true"
            className="size-5"
            style={{
              backgroundColor: "#ffffff",
              maskImage: "url(/nav/sustainability.svg)",
              WebkitMaskImage: "url(/nav/sustainability.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </span>
        <h2 className="text-xl font-bold text-success-700">Leave It Better</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-neutral-700">
        Arc&rsquo;teryx is committed to halving its environmental footprint, with science-based
        targets validated by the SBTi. Returns are one of the largest levers on that footprint — and
        they are the same lever on margin. Every return avoided, restocked, or repaired protects
        product value and cuts carbon at the same time, so the climate targets below are tracked in
        dollars as well as tonnes.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {goals.map((g) => (
          <div
            key={g.label}
            className="flex flex-col rounded-lg border border-success-100 bg-neutral-0 px-3 py-2"
          >
            <span className="text-base font-bold text-neutral-800">{g.value}</span>
            <span className="text-xs text-neutral-600">{g.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ValueRecovery() {
  const max = Math.max(...DISPOSITION.map((d) => d.amount));
  return (
    <Card>
      <CardHeading
        title="Where does returned value go?"
        subtitle="Every returned item either keeps its value or loses it. Landfill is the only path that recovers nothing."
      />
      <div className="mt-4 flex flex-col gap-3">
        {DISPOSITION.map((d) => {
          const loss = d.label === "Landfill";
          return (
            <div key={d.label} className="flex items-center gap-3">
              <span className="w-44 shrink-0 truncate text-sm font-medium text-neutral-800">
                {d.label}
              </span>
              <div className="h-5 min-w-0 flex-1 overflow-hidden rounded-[4px] bg-neutral-100">
                <div
                  data-anim-bar
                  className="h-5 rounded-[4px]"
                  style={{ width: `${(d.amount / max) * 100}%`, backgroundColor: d.color }}
                />
              </div>
              <span
                className={`w-20 shrink-0 text-right text-sm font-semibold ${loss ? "text-danger-600" : "text-neutral-800"}`}
              >
                {d.value}
              </span>
              <span className="w-40 shrink-0 text-right text-xs text-neutral-600">
                {d.items} of items · {d.recovery}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] leading-4 text-neutral-600">
        Shifting even 1% of landfilled units into resale or repair is worth roughly $190K a year.
      </p>
    </Card>
  );
}

function CostBreakdown() {
  return (
    <Card>
      <CardHeading
        title="What returns actually cost"
        subtitle="The spend behind processing a return — and the carbon that rides along with it."
      />
      <div className="mt-4 flex flex-col gap-3">
        {COSTS.map((c) => (
          <div key={c.label} className="flex items-center gap-3">
            <span className="w-52 shrink-0 truncate text-sm font-medium text-neutral-800">
              {c.label}
            </span>
            <div className="h-5 min-w-0 flex-1 overflow-hidden rounded-[4px] bg-neutral-100">
              <div
                data-anim-bar
                className="h-5 rounded-[4px] bg-neutral-600"
                style={{ width: `${c.pct}%` }}
              />
            </div>
            <span className="w-16 shrink-0 text-right text-sm font-semibold text-neutral-800">
              {c.cost}
            </span>
            <span className="w-24 shrink-0 text-right text-xs text-neutral-600">{c.carbon}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-4 text-neutral-600">
        Shipping is both the biggest cost line and the biggest emissions line — one fix moves both.
      </p>
    </Card>
  );
}

function TargetsProgress() {
  return (
    <Card>
      <CardHeading
        title="Targets that pay for themselves"
        subtitle="Progress against the science-based goals, priced by what closing each gap is worth."
      />
      <div className="mt-4 flex flex-col gap-5">
        {TARGETS.map((t) => {
          const pct = Math.min((t.current / t.goal) * 100, 100);
          return (
            <div key={t.label} className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-medium text-neutral-800">{t.label}</span>
                <span className="text-sm font-semibold text-success-600">{t.worth}</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-[4px] bg-neutral-100">
                <div
                  data-anim-bar
                  className="h-3 rounded-[4px] bg-success-600"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-neutral-600">{t.status}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function CostByCategory() {
  return (
    <Card>
      <CardHeading
        title="Return cost & carbon by category"
        subtitle="Where the money and the emissions are concentrated."
      />
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-600">
              <th className="whitespace-nowrap py-2 pr-3 font-normal">Category</th>
              <th className="whitespace-nowrap px-3 py-2 text-right font-normal">Returns</th>
              <th className="whitespace-nowrap px-3 py-2 text-right font-normal">Return Rate</th>
              <th className="whitespace-nowrap px-3 py-2 text-right font-normal">Return Cost</th>
              <th className="whitespace-nowrap px-3 py-2 text-right font-normal">CO₂e</th>
              <th className="whitespace-nowrap py-2 pl-3 font-normal">Share of cost</th>
            </tr>
          </thead>
          <tbody>
            {BY_CATEGORY.map((r) => (
              <tr key={r.category} className="border-b border-primary-50 last:border-b-0">
                <td className="whitespace-nowrap py-3 pr-3 font-medium text-neutral-800">{r.category}</td>
                <td className="whitespace-nowrap px-3 py-3 text-right text-neutral-700">{r.returns}</td>
                <td className="whitespace-nowrap px-3 py-3 text-right text-neutral-700">{r.rate}</td>
                <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-neutral-800">
                  {r.cost}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-right text-neutral-700">{r.carbon}</td>
                <td className="py-3 pl-3">
                  <div className="h-2.5 w-full min-w-[120px] overflow-hidden rounded-[4px] bg-neutral-100">
                    <div
                      data-anim-bar
                      className="h-2.5 rounded-[4px] bg-success-600"
                      style={{ width: `${r.share}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Opportunities() {
  return (
    <Card>
      <CardHeading
        title="Highest-value reductions"
        subtitle="Return levers ranked by annual savings — each one cuts carbon as a co-benefit."
      />
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-600">
              <th className="whitespace-nowrap py-2 pr-3 font-normal">Department</th>
              <th className="whitespace-nowrap px-3 py-2 font-normal">Lever</th>
              <th className="whitespace-nowrap px-3 py-2 text-right font-normal">Annual Savings</th>
              <th className="whitespace-nowrap px-3 py-2 text-right font-normal">Payback</th>
              <th className="whitespace-nowrap px-3 py-2 text-right font-normal">CO₂e Avoided</th>
              <th className="py-2 pl-3 font-normal" />
            </tr>
          </thead>
          <tbody>
            {OPPORTUNITIES.map((r) => (
              <tr key={r.dept} className="border-b border-primary-50 last:border-b-0">
                <td className="whitespace-nowrap py-3 pr-3 font-medium text-neutral-800">{r.dept}</td>
                <td className="whitespace-nowrap px-3 py-3 text-neutral-700">{r.lever}</td>
                <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-success-600">
                  {r.savings}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-right text-neutral-700">{r.payback}</td>
                <td className="whitespace-nowrap px-3 py-3 text-right text-neutral-600">{r.carbon}</td>
                <td className="py-3 pl-3 text-right">
                  <TakeAction context="Sustainability" department={r.dept} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ----------------------------- page ------------------------------ */

export default function SustainabilityContent() {
  return (
    <ActionModalProvider>
      <div className="min-h-screen bg-neutral-0">
        <Header />
        <div className="flex flex-col gap-5 px-4 pb-10 pt-3.5">
          <FilterBar />
          <MissionBanner />
          <AiInsight>
            Returns cost you{" "}
            <span className="font-semibold text-neutral-800">$4.6M in logistics</span>{" "}this period,
            plus another $1.2M in product written off to disposal. The same levers that would cut
            1,240 t CO₂e are worth roughly{" "}
            <span className="font-semibold text-neutral-800">$3.0M a year back to margin</span>{" "}— and
            Footwear size bracketing alone accounts for $1.4M of it. Keeping product in circulation
            is the single biggest lever on both the P&amp;L and the footprint.
          </AiInsight>
          <KpiStrip items={KPIS} cols={5} />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ValueRecovery />
            <CostBreakdown />
          </div>
          <TargetsProgress />
          <CostByCategory />
          <Opportunities />
        </div>
      </div>
    </ActionModalProvider>
  );
}
