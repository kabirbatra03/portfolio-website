import type { ReactNode } from "react";

export function Crosshair({
  className = "",
  accent = false,
}: {
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`crosshair ${accent ? "crosshair-accent" : ""} ${className}`}
    />
  );
}

/* A framed section: bottom rule across the column with + markers seated on
   the column edges. Pass `top` for the first section to seat top markers too. */
export function Section({
  id,
  children,
  top = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  top?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative border-b border-line bg-bg px-5 py-9 sm:px-8 sm:py-11 ${className}`}
    >
      {top && (
        <>
          <Crosshair className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
          <Crosshair className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
        </>
      )}
      <Crosshair className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
      <Crosshair className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
      {children}
    </section>
  );
}

/* small uppercase mono kicker used sparingly as section grammar */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-faint">
      <span className="size-1 bg-accent" aria-hidden />
      {children}
    </span>
  );
}

/* tech / skill chip: present in both themes, amber accent on hover */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border border-line bg-surface px-2 py-0.5 text-[10px] text-muted transition-colors duration-200 ease-out hover:border-accent/40 hover:text-accent">
      {children}
    </span>
  );
}

export function Heading({
  children,
  as: Tag = "h2",
}: {
  children: ReactNode;
  as?: "h2" | "h3";
}) {
  return (
    <Tag className="font-display text-[1.7rem] font-bold leading-none tracking-tight text-fg sm:text-[2rem]">
      {children}
    </Tag>
  );
}
