"use client";

import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  icon: string; // file name in /public/nav
  href: string;
  selected?: boolean;
  badge?: number;
};

const MAIN_ITEMS: NavItem[] = [
  { label: "Overview", icon: "dashboard", href: "/", selected: true },
  { label: "Returns Drivers", icon: "lightbulb", href: "/returns-drivers" },
  { label: "Actions", icon: "lists", href: "/actions" },
  { label: "My Workspace", icon: "team-dashboard", href: "/workspace" },
  { label: "Products", icon: "shopping-bag", href: "/products" },
  { label: "Data Explorer", icon: "database", href: "/data-explorer" },
  { label: "Reports", icon: "assignment", href: "/reports" },
];

const UTILITY_ITEMS: NavItem[] = [
  { label: "Help Center", icon: "help", href: "/help" },
  { label: "Admin", icon: "admin", href: "/admin" },
  { label: "Notifications", icon: "notifications", href: "/notifications", badge: 3 },
  { label: "My Account", icon: "account-circle", href: "/account" },
];

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      aria-current={item.selected ? "page" : undefined}
      className={[
        "flex h-10 w-full items-center gap-1 rounded-lg p-2 transition-colors",
        item.selected
          ? "bg-primary-100"
          : "hover:bg-neutral-100 focus-visible:bg-neutral-100",
        "outline-none focus-visible:ring-2 focus-visible:ring-primary-600/40",
      ].join(" ")}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/nav/${item.icon}.svg`} alt="" className="size-6 shrink-0" />
      <span
        className={[
          "whitespace-nowrap text-sm",
          item.selected
            ? "font-medium text-primary-600"
            : "font-normal text-neutral-700",
        ].join(" ")}
      >
        {item.label}
      </span>
      {item.badge ? (
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-error-600 text-[12px] leading-none text-white">
          {item.badge}
        </span>
      ) : null}
    </a>
  );
}

function AiCreditUsage() {
  return (
    <div className="h-[60px] w-full overflow-hidden rounded-lg bg-neutral-0">
      <div className="flex h-full flex-col px-3 py-2">
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/nav/sparkle.svg" alt="" className="size-4" />
              <span className="text-[12px] text-neutral-500">AI credit usage</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav/info.svg" alt="More info" className="size-4" />
          </div>
          <div className="flex items-center gap-0.5 text-[12px] leading-none">
            <span className="font-bold text-neutral-800">9,700</span>
            <span className="font-semibold text-neutral-500">/ 12,500</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-1 rounded-full bg-primary-600"
              style={{ width: "64%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="#212121"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="#212121"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Sidebar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sticky shadow after 50px of page scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile panel when crossing back to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile hamburger trigger (hidden ≥768px) */}
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-30 flex size-10 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-0 shadow-sm md:hidden"
      >
        <HamburgerIcon />
      </button>

      {/* Backdrop overlay (mobile only) */}
      <div
        onClick={closeMobile}
        aria-hidden="true"
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex h-screen w-sidebar flex-col gap-10 bg-neutral-50 px-4 py-5",
          "transition-[transform,box-shadow] duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:sticky md:top-0 md:z-0 md:translate-x-0",
          scrolled ? "shadow-[2px_0_16px_rgba(0,0,0,0.08)]" : "shadow-none",
        ].join(" ")}
      >
        {/* Logo header */}
        <div className="flex h-20 shrink-0 items-center justify-between py-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nav/arcteryx-logo.svg"
            alt="Arc'teryx"
            className="h-[72px] w-[122px] object-contain"
          />
          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={closeMobile}
            className="shrink-0"
          >
            {/* On mobile this acts as a close button; on desktop it's the collapse affordance from the design. */}
            <span className="md:hidden">
              <CloseIcon />
            </span>
            <span className="hidden md:inline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/nav/right-panel-open.svg" alt="" className="size-6" />
            </span>
          </button>
        </div>

        {/* Pages */}
        <nav className="flex min-h-0 w-full flex-1 flex-col justify-between">
          <div className="flex w-full flex-col gap-4">
            {MAIN_ITEMS.map((item) => (
              <NavLink key={item.label} item={item} onNavigate={closeMobile} />
            ))}
          </div>

          <div className="flex w-full flex-col gap-5 border-t border-neutral-200 pt-4">
            <div className="flex w-full flex-col gap-2">
              {UTILITY_ITEMS.map((item) => (
                <NavLink key={item.label} item={item} onNavigate={closeMobile} />
              ))}
            </div>

            <AiCreditUsage />

            <div className="flex h-[34px] w-full items-center px-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nav/returnalyze-logo.svg"
                alt="Returnalyze"
                className="h-[21px] w-auto"
              />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
