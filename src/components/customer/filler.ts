import { CATEGORY_OPTS } from "./filters";

/**
 * Demo-data helpers. The hand-written rows at the top of each table are the
 * "real" ones from the prototype; these pad the tables out so pagination has
 * actual pages to move through. Values are derived from the row name so they
 * stay identical across renders instead of reshuffling.
 */

/** Department names, minus the leading "All Product Categories" entry. */
export const FILLER_DEPTS = CATEGORY_OPTS.slice(1);

/** Stable pseudo-random value in [min, max] derived from a name + salt. */
export function seeded(name: string, salt: number, min: number, max: number) {
  let h = salt >>> 0;
  for (let i = 0; i < name.length; i++) h = (Math.imul(h, 31) + name.charCodeAt(i)) >>> 0;
  return min + ((h % 10000) / 10000) * (max - min);
}

export const money = (v: number) =>
  v >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `$${Math.round(v / 1e3)}K` : `$${Math.round(v)}`;

export const pctStr = (v: number) => `${v.toFixed(2)}%`;

export const countStr = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K` : String(Math.round(v));
