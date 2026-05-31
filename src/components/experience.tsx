"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

import { experience } from "@/lib/data";
import { Heading, Kicker, Section, Tag } from "./decor";
import { Reveal } from "./motion";

function Summary({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const isBulleted = lines.length > 0 && lines.every((line) => line.startsWith("- "));

  if (isBulleted) {
    return (
      <ul className="list-disc space-y-2 pl-5 text-[0.82rem] leading-relaxed text-muted marker:text-accent/80">
        {lines.map((line) => (
          <li key={line}>{line.replace(/^- /, "")}</li>
        ))}
      </ul>
    );
  }

  return <p className="text-[0.82rem] leading-relaxed text-muted">{text}</p>;
}

function Row({
  item,
  open,
  onToggle,
}: {
  item: (typeof experience)[number];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-line bg-bg">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface/40 active:scale-[0.997]"
      >
        <span
          aria-hidden
          className={`size-1.5 shrink-0 transition-colors ${open ? "bg-accent" : "bg-line-strong"}`}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-sm font-semibold tracking-tight text-fg">
            {item.role}
          </span>
          <span className="mt-0.5 block truncate text-[11px] text-faint">
            {item.company} · {item.type}
          </span>
        </span>
        <span className="hidden shrink-0 text-[11px] text-faint sm:block">
          {item.period}
        </span>
        <CaretDown
          size={14}
          weight="bold"
          className={`shrink-0 text-faint transition-transform duration-300 ease-out ${open ? "rotate-180 text-accent" : ""}`}
        />
      </button>
      <div className="collapsible" data-open={open}>
        <div>
          <div className="border-t border-line-soft px-4 py-3.5">
            <Summary text={item.summary} />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <Section id="experience">
      <Reveal>
        <Kicker>04 / track record</Kicker>
        <Heading>Experience</Heading>
      </Reveal>
      <div className="mt-6 space-y-2.5">
        {experience.map((item, i) => (
          <Reveal key={`${item.company}-${item.period}`} delay={i * 0.05}>
            <Row
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex((current) => (current === i ? -1 : i))}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
