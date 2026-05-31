"use client";

import { awards, education } from "@/lib/data";
import { Heading, Kicker, Section } from "./decor";
import { Reveal } from "./motion";

function GroupLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
      {children}
    </p>
  );
}

export function Background() {
  return (
    <Section>
      <Reveal>
        <Kicker>08 / background</Kicker>
        <Heading>Background</Heading>

        <div className="mt-7 space-y-6">
          <div>
            <GroupLabel>Education</GroupLabel>
            <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div>
                <p className="font-display text-sm font-semibold tracking-tight text-fg">
                  {education.degree}
                </p>
                <p className="mt-0.5 text-xs text-muted">{education.school}</p>
              </div>
              <p className="text-[11px] text-faint">
                {education.detail} · {education.period}
              </p>
            </div>
          </div>

          <div className="border-t border-line-soft pt-5">
            <GroupLabel>Recognition</GroupLabel>
            <ul className="mt-2.5 space-y-2">
              {awards.map((award) => (
                <li
                  key={`${award.title}-${award.year}`}
                  className="flex items-baseline justify-between gap-3 text-sm"
                >
                  <span className="text-fg">
                    {award.title}
                    <span className="text-faint"> · {award.org}</span>
                  </span>
                  <span className="shrink-0 text-[11px] text-faint">
                    {award.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
