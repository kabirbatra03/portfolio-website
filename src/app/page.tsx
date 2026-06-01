import { About, Connect } from "@/components/about";
import { ActivityGraph } from "@/components/activity-graph";
import { Background } from "@/components/background";
import { Closing } from "@/components/closing";
import { CertificatesSection } from "@/components/certificates";
import { ExperienceSection } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { PublicationsSection } from "@/components/publications";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh]">
      {/* hatched engineering-drawing margins (covered by the column) */}
      <div className="field-hatch pointer-events-none fixed inset-0 z-0" aria-hidden />

      {/* framed center column */}
      <div className="relative z-10 mx-auto min-h-[100dvh] w-full max-w-[var(--col-w)] border-x border-line bg-bg">
        <SiteHeader />
        <main>
          <Hero />
          <About />
          <Connect />
          <ActivityGraph />
          <ExperienceSection />
          <Projects />
          <PublicationsSection />
          <Background />
          <CertificatesSection />
          <Closing />
        </main>
      </div>

      {/* CRT phosphor bloom + scanlines, above content, never blocking input */}
      <div className="crt-bloom pointer-events-none fixed inset-0 z-40" aria-hidden />
      <div
        className="crt-overlay pointer-events-none fixed inset-0 z-40 opacity-[0.35]"
        aria-hidden
      />
    </div>
  );
}
