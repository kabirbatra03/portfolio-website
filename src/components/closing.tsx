import { profile, quote } from "@/lib/data";
import { Crosshair, Section } from "./decor";
import { Reveal } from "./motion";

export function Closing() {
  return (
    <>
      <Section className="text-center">
        <Reveal>
          <span className="font-serif text-5xl leading-none text-accent/80">&ldquo;</span>
          <p className="mx-auto mt-3 max-w-md font-serif text-lg italic leading-relaxed text-fg/90">{quote}</p>
        </Reveal>
      </Section>

      <footer className="relative bg-bg px-5 pt-7 sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="text-[11px] leading-relaxed text-faint">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            <p className="mt-1">Built with curiosity and coffee.</p>
          </div>
          <span className="font-mono text-[10px] leading-tight text-line-strong whitespace-pre">
            {` /\\_/\\\n( o.o )\n > ^ < `}
          </span>
        </div>
        <div
          aria-hidden
          className="field-dots relative mt-6 h-16 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        >
          <Crosshair className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
          <Crosshair className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
        </div>
      </footer>
    </>
  );
}
