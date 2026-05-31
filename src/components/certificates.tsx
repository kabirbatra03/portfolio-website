"use client";

import { certificates } from "@/lib/data";
import { Heading, Kicker, Section } from "./decor";
import { Reveal } from "./motion";

function GroupLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
      {children}
    </p>
  );
}

function CertificateList({
  items,
}: {
  items: typeof certificates;
}) {
  return (
    <ul className="mt-2.5 space-y-2">
      {items.map((item) => (
        <li
          key={`${item.title}-${item.date}`}
          className="flex items-baseline justify-between gap-3 text-sm"
        >
          <span className="text-fg">
            {item.title}
            <span className="text-faint"> · {item.issuer}</span>
          </span>
          <span className="shrink-0 text-[11px] text-faint">{item.date}</span>
        </li>
      ))}
    </ul>
  );
}

export function CertificatesSection() {
  const coursera = certificates.filter((item) => item.platform === "Coursera");
  const udemy = certificates.filter((item) => item.platform === "Udemy");

  return (
    <Section id="certificates">
      <Reveal>
        <Kicker>07 / credentials</Kicker>
        <Heading>Certificates</Heading>

        <div className="mt-7 space-y-6">
          <div>
            <GroupLabel>Coursera</GroupLabel>
            <CertificateList items={coursera} />
          </div>

          <div className="border-t border-line-soft pt-5">
            <GroupLabel>Udemy</GroupLabel>
            <CertificateList items={udemy} />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
