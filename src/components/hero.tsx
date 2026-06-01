"use client";

import { MapPin, Eye } from "@phosphor-icons/react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { profile } from "@/lib/data";
import { Crosshair, Section } from "./decor";

function Avatar() {
  return (
    <Image
      src="/profile-photo-v3.jpg"
      alt={`${profile.name} profile photo`}
      width={80}
      height={80}
      className="shrink-0 rounded-md border border-line-strong object-cover"
      priority
    />
  );
}

const EASE = [0.23, 1, 0.32, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [views, setViews] = useState<number>(profile.views);
  const [isViewsLoading, setIsViewsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const updateViews = async () => {
      try {
        const response = await fetch("/api/views", {
          method: "POST",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { views?: number };
        if (mounted && typeof payload.views === "number") {
          setViews(payload.views);
        }
      } catch {
        // Keep the static fallback from profile.views when unavailable.
      } finally {
        if (mounted) {
          setIsViewsLoading(false);
        }
      }
    };

    const timer = setTimeout(() => {
      void updateViews();
    }, 200);

    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, []);

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <Section id="home" top className="overflow-hidden">
      <motion.div {...fade(0)} className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
        <span className="inline-flex items-center gap-2 text-accent-dim">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          {profile.available ? "Open to opportunities" : "Heads down"}
        </span>
        {!isViewsLoading ? (
          <span className="inline-flex items-center gap-1.5 text-faint">
            <Eye size={13} weight="bold" />
            {views.toLocaleString()}
          </span>
        ) : null}
      </motion.div>

      {/* dotted blueprint plate */}
      <motion.div
        {...fade(0.06)}
        aria-hidden
        className="field-dots relative my-7 h-16 [mask-image:radial-gradient(60%_120%_at_50%_50%,black,transparent)]"
      >
        <Crosshair accent className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      <div className="flex items-center gap-5">
        <motion.div {...fade(0.12)}>
          <Avatar />
        </motion.div>
        <div className="min-w-0">
          <motion.h1
            {...fade(0.18)}
            className="flex items-center gap-2 font-display text-[2rem] font-bold leading-none tracking-tight text-fg sm:text-[2.4rem]"
          >
            {profile.name}
            <span
              className="grid size-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-bg"
              title="Verified"
              aria-hidden
            >
              ✓
            </span>
          </motion.h1>
          <motion.p {...fade(0.24)} className="mt-2 text-sm text-muted">
            <span className="text-accent">{profile.role}</span>
            <span
              aria-hidden
              className="cursor-blink ml-0.5 inline-block h-[1em] w-[0.6ch] translate-y-[0.08em] rounded-[1px] bg-accent align-baseline"
            />
          </motion.p>
          <motion.p {...fade(0.3)} className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-faint">
            <MapPin size={13} weight="fill" className="text-accent-dim" />
            {profile.location}
          </motion.p>
        </div>
      </div>
    </Section>
  );
}
