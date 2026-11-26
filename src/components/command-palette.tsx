"use client";

import { ArrowSquareOut, Hash, MagnifyingGlass, MoonStars } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { socials } from "@/lib/data";
import { toggleTheme } from "./theme-toggle";

type Command = {
  label: string;
  group: "Go to" | "Links" | "Actions";
  run: () => void;
};

const sections = [
  { label: "Home", id: "home" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Publications", id: "publications" },
  { label: "Certificates", id: "certificates" },
];

const commands: Command[] = [
  ...sections.map<Command>(({ label, id }) => ({
    label,
    group: "Go to",
    run: () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    },
  })),
  ...socials.map<Command>(({ label, href }) => ({
    label,
    group: "Links",
    run: () => {
      if (href.startsWith("http")) window.open(href, "_blank", "noopener,noreferrer");
      else window.location.href = href;
    },
  })),
  { label: "Toggle theme", group: "Actions", run: toggleTheme },
];

const groupIcon = { "Go to": Hash, Links: ArrowSquareOut, Actions: MoonStars };

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;
  // portal: the sticky header uses backdrop-filter, which would trap a fixed overlay inside it
  return createPortal(<Palette onClose={() => onOpenChange(false)} />, document.body);
}

function Palette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<Element | null>(null);

  const q = query.trim().toLowerCase();
  const results = q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    restoreFocus.current = document.activeElement;
    inputRef.current?.focus();
    return () => {
      if (restoreFocus.current instanceof HTMLElement) restoreFocus.current.focus();
    };
  }, []);

  useEffect(() => {
    document.getElementById(`${listId}-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [listId, activeIndex]);

  function run(command: Command) {
    onClose();
    command.run();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "Tab") {
      // the input is the dialog's only focusable element; keep focus trapped in the modal
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((activeIndex + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((activeIndex - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      run(results[activeIndex]);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-bg/60 px-4 pt-[15vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className="w-full max-w-md border border-line-strong bg-elevated shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-line px-3">
          <MagnifyingGlass size={14} weight="bold" className="text-faint" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Type a command or search…"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[activeIndex] ? `${listId}-${activeIndex}` : undefined}
            className="h-11 w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
          />
          <kbd className="border border-line-soft px-1.5 py-0.5 text-[10px] text-faint">Esc</kbd>
        </div>
        <ul id={listId} role="listbox" className="max-h-72 overflow-y-auto py-1.5">
          {results.length === 0 && <li className="px-3 py-6 text-center text-xs text-faint">No results</li>}
          {results.map((command, i) => {
            const Glyph = groupIcon[command.group];
            const selected = i === activeIndex;
            return (
              <li
                key={`${command.group}-${command.label}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={selected}
                onMouseMove={() => setActive(i)}
                onClick={() => run(command)}
                className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-xs ${selected ? "bg-surface text-fg" : "text-muted"}`}
              >
                <Glyph size={13} weight="bold" className={selected ? "text-accent" : "text-faint"} aria-hidden />
                <span className="flex-1">{command.label}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-faint">{command.group}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
