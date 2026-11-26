"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

export function ThemeToggle() {
  // null on the server and during hydration, so the markup matches whatever theme the init script picked
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const reduce = useReducedMotion();

  function onToggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next: Theme = getTheme() === "dark" ? "light" : "dark";
    const startViewTransition = (
      document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      }
    ).startViewTransition;

    if (reduce || typeof startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = startViewTransition.call(document, () => setTheme(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 480,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
      title="Toggle theme"
      className="grid size-6 place-items-center border border-line-soft text-faint transition-[color,border-color,transform] duration-150 ease-out hover:border-accent/50 hover:text-accent active:scale-90"
    >
      {theme === "dark" ? <Moon size={13} weight="bold" /> : <Sun size={13} weight="bold" />}
    </button>
  );
}
