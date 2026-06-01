"use client";

import { EnvelopeSimple, FileText, GithubLogo, LinkedinLogo, Phone, XLogo, type Icon } from "@phosphor-icons/react";

import { profile, socials } from "@/lib/data";
import { Heading, Kicker, Section } from "./decor";
import { Reveal } from "./motion";

const icons: Record<string, Icon> = {
  github: GithubLogo,
  x: XLogo,
  linkedin: LinkedinLogo,
  mail: EnvelopeSimple,
  phone: Phone,
  file: FileText,
};

export function About() {
  return (
    <Section>
      <Reveal>
        <Kicker>01 / about</Kicker>
        <Heading>About</Heading>
        <ul className="mt-6 space-y-3.5 text-[0.92rem] leading-relaxed text-muted">
          {profile.tagline.map((line, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent/70" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
export function Connect() {
  return (
    <Section>
      <Reveal>
        <Kicker>02 / connect</Kicker>
        <Heading>Connect</Heading>
        <div className="mt-6 flex flex-wrap gap-2">
          {socials.map(({ label, href, icon }) => {
            const Glyph = icons[icon];
            return (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2 border border-line px-3 py-2 text-xs text-muted transition-[color,border-color,transform] duration-150 ease-out hover:border-accent/50 hover:text-fg active:scale-[0.97]"
              >
                {Glyph && (
                  <Glyph size={14} weight="bold" className="text-faint transition-colors group-hover:text-accent" />
                )}
                {label}
              </a>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
