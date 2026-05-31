"use client";

import {
  ArrowUpRight,
  CaretDown,
  FileIcon,
  GithubLogo,
  GlobeHemisphereWest,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

import { projects, type Project } from "@/lib/data";
import { Heading, Kicker, Section, Tag } from "./decor";
import { Reveal } from "./motion";

function monogram(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Preview({ project }: { project: Project }) {
  const tint = `oklch(0.62 0.16 ${project.hue})`;
  return (
    <div className="relative flex aspect-16/10 flex-col overflow-hidden border-b border-line bg-surface">
      <div className="relative z-10 flex shrink-0 items-center gap-1.5 border-b border-line-soft bg-bg/40 px-3 py-2 backdrop-blur-sm">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="ml-2 truncate text-[10px] text-faint">
          {project.name.toLowerCase().replace(/\s+/g, "-")}.app
        </span>
      </div>
      <div className="relative min-h-0 flex-1">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <>
            <div className="field-dots absolute inset-0 opacity-50" aria-hidden />
            <div
              className="absolute inset-0"
              aria-hidden
              style={{
                background: `radial-gradient(60% 90% at 50% 120%, oklch(0.83 0.15 ${project.hue} / 0.18), transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 grid place-items-center font-display text-5xl font-bold"
              style={{ color: tint }}
            >
              {monogram(project.name)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const CLAMP_LINES = 3;
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
  const overflows = measured && fullHeight! > collapsedHeight! + 1;
  const maxHeight = !measured
    ? undefined
    : open || !overflows
      ? fullHeight
      : collapsedHeight;

  return (
    <>
      <div
        className="relative mt-2 overflow-hidden"
        style={{ maxHeight, transition: `max-height 300ms ${REVEAL_EASE}` }}
      >
        <p ref={ref} className="text-[0.82rem] leading-relaxed text-muted">
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

function Card({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col border border-line bg-bg transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-line-strong">
      <Preview project={project} />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-base font-semibold tracking-tight text-fg">
            {project.name}
          </h3>
          <span className="shrink-0 text-[11px] text-faint">{project.date}</span>
        </div>
        <Description text={project.description} />
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        {(project.live || project.paper || project.researchGate || project.repo) && (
          <div className="mt-4 flex items-center gap-4 border-t border-line-soft pt-3 text-xs">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
              >
                <GlobeHemisphereWest size={12} weight="bold" />
                Live <ArrowUpRight size={12} weight="bold" />
              </a>
            )}
            {project.paper && (
              <a
                href={project.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
              >
                <FileIcon size={12} weight="bold" />
                IEEE <ArrowUpRight size={12} weight="bold" />
              </a>
            )}
            {project.researchGate && (
              <a
                href={project.researchGate}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
              >
                <FileIcon size={12} weight="bold" />
                ResearchGate <ArrowUpRight size={12} weight="bold" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
              >
                <GithubLogo size={12} weight="bold" /> Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <Reveal>
        <Kicker>05 / work</Kicker>
        <Heading>Projects</Heading>
      </Reveal>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.06}>
            <Card project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
