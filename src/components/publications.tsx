"use client";

import { CaretDown, FileIcon, GithubLogo, type Icon } from "@phosphor-icons/react";
import { useLayoutEffect, useRef, useState } from "react";

import { publications } from "@/lib/data";
import { Heading, Kicker, Section } from "./decor";
import { Reveal } from "./motion";

const icons: Record<string, Icon> = {
  file: FileIcon,
  github: GithubLogo,
};

const CLAMP_LINES = 6;
// Matches the .collapsible easing in globals.css so reveals feel cohesive.
const REVEAL_EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

function Description({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number>();
  const [fullHeight, setFullHeight] = useState<number>();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const collapsed = Number.isFinite(lineHeight)
        ? lineHeight * CLAMP_LINES
        : undefined;
      setCollapsedHeight(collapsed);
      setFullHeight(el.scrollHeight);
    };

    measure();
    const frame = window.requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [text]);

  const measured = collapsedHeight !== undefined && fullHeight !== undefined;
  const overflows = measured && fullHeight > collapsedHeight + 1;
  const maxHeight = !measured
    ? undefined
    : open || !overflows
      ? fullHeight
      : collapsedHeight;

  return (
    <>
      <div
        className="relative mt-1.5 overflow-hidden"
        style={{ maxHeight, transition: `max-height 300ms ${REVEAL_EASE}` }}
      >
        <p
          ref={ref}
          className="whitespace-pre-line text-[0.82rem] leading-relaxed text-muted"
        >
          {text}
        </p>
        {overflows && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-linear-to-t from-bg to-transparent transition-opacity duration-200 ease-out"
            style={{ opacity: open ? 0 : 1 }}
          />
        )}
      </div>
      {overflows && (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="mt-1.5 inline-flex cursor-pointer items-center gap-1 self-start text-[11px] text-faint transition-[color,transform] duration-200 ease-out hover:text-accent active:scale-[0.97]"
        >
          {open ? "Show less" : "Show more"}
          <CaretDown
            size={11}
            weight="bold"
            className={`transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </>
  );
}

export function PublicationsSection() {
  return (
    <Section id="publications">
      <Reveal>
        <Kicker>06 / writing</Kicker>
        <Heading>Publications</Heading>

        <div className="mt-7 space-y-6">
          {publications.map((pub) => (
            <div key={pub.title}>
              <p className="font-display text-sm font-semibold tracking-tight text-fg">
                {pub.title}
              </p>
              <Description text={pub.description} />
              <div className="mt-3 flex flex-wrap gap-2">
                {pub.links.map(({ label, href, icon }) => {
                  const Glyph = icons[icon];
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 border border-line px-3 py-2 text-xs text-muted transition-[color,border-color,transform] duration-150 ease-out hover:border-accent/50 hover:text-fg active:scale-[0.97]"
                    >
                      {Glyph && (
                        <Glyph
                          size={14}
                          weight="bold"
                          className="text-faint transition-colors group-hover:text-accent"
                        />
                      )}
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
