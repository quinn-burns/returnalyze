"use client";

import { useState } from "react";

export const BRAND_OPTS = ["All Brands", "Caterpillar", "Chaco", "Merrell", "Saucony", "Wolverine"];
export const COUNTRY_OPTS = ["All Countries", "UK", "US"];
export const CATEGORY_OPTS = [
  "All Product Categories", "Accessories", "All Other", "Alloy Toe", "Apparel", "Boots", "Bottoms",
  "Canyon", "Carbon Composite Toe", "Casual", "Casual Bottoms", "Casual Jackets", "Casual Tops",
  "Composite Toe", "Cush", "Custom", "Fields", "Flame Resistant", "Gift Card", "Heritage",
  "Hydro Hike", "Licensed", "Light Hike", "Lowdown", "Mid Layers", "Non-Footwear", "Non-Licensed",
  "None", "Originals", "Outerwear", "Pack Hike", "Performance Bottoms", "Performance Jackets",
  "Performance Tops", "Pro", "Ramble", "Rapid Pro", "Rugged Outdoor", "Running", "Sandals", "Shirts",
  "Shoes", "Slippers", "Sneakers", "Socks", "Soft Toe", "Steel Toe", "Tactical", "Tech",
  "Trail Running", "Training", "Utility", "Walking", "Winter Casual", "Winter Hike", "Z",
];
export const CUSTOMER_TYPE_OPTS = ["All Customers", "New", "Existing"];
export const DEPARTMENT_OPTS = ["All Departments", ...CATEGORY_OPTS.slice(1)];
export const PERIOD_OPTS = [
  "Rolling 12 Months", "Rolling 90 Days", "Rolling 30 Days", "Year to Date",
];

/** Native styled select for the filter bar. */
export function FilterSelect({ label, options }: { label: string; options: string[] }) {
  const [value, setValue] = useState(options[0]);
  return (
    <label className="flex min-w-[150px] flex-1 flex-col gap-1">
      <span className="text-xs text-neutral-500">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-10 w-full appearance-none truncate rounded-lg border border-neutral-200 bg-neutral-0 pl-3 pr-9 text-sm text-neutral-800 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-600/40"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 1l4 4 4-4" stroke="#8a8a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
  );
}
