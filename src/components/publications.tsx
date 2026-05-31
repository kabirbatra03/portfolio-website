"use client";

import { FileIcon, GithubLogo, type Icon } from "@phosphor-icons/react";

import { publications } from "@/lib/data";
import { Heading, Kicker, Section } from "./decor";
import { Reveal } from "./motion";

const icons: Record<string, Icon> = {
  file: FileIcon,
  github: GithubLogo,
};

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
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">
                {pub.description}
              </p>
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
