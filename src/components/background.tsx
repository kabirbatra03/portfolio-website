"use client";

import { education } from "@/lib/data";
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
        </div>
      </Reveal>
    </Section>
  );
}
