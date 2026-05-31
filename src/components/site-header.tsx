"use client";

import { nav, profile } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="flex h-13 items-center justify-between px-5 sm:px-8">
        <a href="#home" className="group inline-flex items-center gap-2 text-fg" aria-label={`${profile.name}, home`}>
          <span className="grid size-6 place-items-center border border-line-strong text-[11px] font-bold tracking-tight text-accent transition-colors duration-150 group-hover:border-accent">
            {profile.initials}
          </span>
          <span className="text-xs text-faint">~/portfolio</span>
        </a>

        <nav className="flex items-center gap-1 text-xs">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-sm px-2.5 py-1.5 text-muted transition-colors duration-150 ease-out hover:text-fg"
            >
              {item.label}
            </a>
          ))}
          <span
            aria-hidden
            className="ml-2 hidden items-center gap-1 border border-line-soft px-2 py-1 text-[10px] text-faint sm:inline-flex"
          >
            <kbd className="font-mono">Ctrl</kbd>
            <kbd className="font-mono">K</kbd>
          </span>
          <span className="ml-1 sm:ml-2">
            <ThemeToggle />
          </span>
        </nav>
      </div>
    </header>
  );
}
