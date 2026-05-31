import { Heading, Kicker, Section } from "./decor";
import { Reveal } from "./motion";

const WEEKS = 52;
const DAYS = 7;

// deterministic pseudo-random so server and client render identically
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260529);
const cells: number[] = Array.from({ length: WEEKS * DAYS }, () => {
  const r = rand();
  if (r > 0.93) return 4;
  if (r > 0.8) return 3;
  if (r > 0.58) return 2;
  if (r > 0.3) return 1;
  return 0;
});
const total = cells.reduce((sum, level) => sum + level * 4, 0);

const levelClass = [
  "bg-line-soft",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
];

function Legend() {
  return (
    <span className="inline-flex flex-wrap items-center justify-end gap-1.5 text-[10px] text-faint">
      Less
      {levelClass.map((c, i) => (
        <span key={i} className={`size-2.5 ${c}`} />
      ))}
      More
    </span>
  );
}

export function ActivityGraph() {
  return (
    <Section>
      <Reveal>
        <Kicker>03 / signal</Kicker>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Heading>Activity</Heading>
          <span className="ml-auto text-[11px] leading-tight text-faint sm:text-right">
            <span className="text-accent">{total}</span> contributions · last
            year
          </span>
        </div>

        <div className="mt-6 min-w-0 pb-1 [--gap:1px] sm:[--gap:2px]">
          <div
            className="grid w-full grid-flow-col auto-cols-fr gap-(--gap)"
            style={{ gridTemplateRows: `repeat(${DAYS}, minmax(0, 1fr))` }}
          >
            {cells.map((level, i) => (
              <span
                key={i}
                className={`aspect-square w-full ${levelClass[level]}`}
                title={`${level * 4} contributions`}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Legend />
        </div>
      </Reveal>
    </Section>
  );
}
