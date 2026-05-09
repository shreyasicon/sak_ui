import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { GuardianDashboard } from "./GuardianDashboard";

function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 1.6,
}: {
  target: number | string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(typeof target === "number" ? 0 : target);

  useEffect(() => {
    if (!inView || typeof target !== "number") return;
    const ctrl = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, target, duration]);

  if (typeof target === "string") return <span ref={ref}>{prefix}{target}{suffix}</span>;
  return <span ref={ref} className="tabular-nums">{prefix}{display}{suffix}</span>;
}

const STATS = [
  { value: "20/20",  label: "Evil patterns",    sub: "blocked"          },
  { value: "43ms",   label: "Average",           sub: "block time"       },
  { value: "$0",     label: "On-chain cost",     sub: "per rejection"    },
];

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen bg-[#080810] pt-32 pb-0 overflow-hidden">

      {/* radial glow — ONLY behind headline */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 30%, rgba(0,232,122,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-6 w-full">

        {/* ── badge ── */}
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00e87a]/20 bg-[#00e87a]/8 text-[#00e87a] text-[10px] tracking-[0.12em] font-display">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e87a]" />
            COLOSSEUM FRONTIER 2026
          </span>
        </motion.div>

        {/* ── headline ── */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.06] tracking-tight text-white mb-7"
        >
          Every AI Agent<br />
          Is One Transaction Away<br />
          <span className="text-white/90">From an Empty Wallet.</span>
        </motion.h1>

        {/* ── subtext ── */}
        <motion.p
          {...fadeUp(0.32)}
          className="text-[#8888aa] text-lg leading-relaxed max-w-[520px] mb-10"
        >
          SAK intercepts every transaction before signing.
          Simulation. Rules. Zero on-chain cost.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div {...fadeUp(0.42)} className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <a
            href="#waitlist-form"
            className="flex items-center gap-2 h-11 px-6 bg-[#00e87a] text-black text-[14px] font-bold rounded-lg hover:bg-[#00ff87] transition-colors duration-200"
          >
            Launch Demo
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/docs"
            className="flex items-center gap-2 h-11 px-6 border border-white/[0.12] text-white/80 text-[14px] font-medium rounded-lg hover:border-white/25 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
          >
            <FileText className="w-4 h-4" />
            Read the Docs
          </a>
        </motion.div>

        {/* ── stats row ── */}
        <motion.div
          {...fadeUp(0.52)}
          className="grid grid-cols-3 w-full max-w-lg mb-16 text-left"
        >
          {STATS.map(({ value, label, sub }, i) => (
            <div key={label} className={`pt-4 ${i > 0 ? "pl-8" : ""} ${i < 2 ? "pr-8 border-r border-white/[0.08]" : ""} border-t border-white/[0.08]`}>
              <div className="font-display font-bold text-3xl text-white mb-1 leading-none">
                <CountUp target={value} />
              </div>
              <div className="text-[#8888aa] text-[12px] leading-snug">{label}<br />{sub}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── dashboard screenshot ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
        className="relative w-full max-w-5xl mx-auto px-6 pb-0"
      >
        {/* top fade overlay */}
        <div
          className="absolute top-0 left-6 right-6 h-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #080810 0%, transparent 100%)" }}
        />

        <div className="opacity-90 rounded-t-xl overflow-hidden shadow-[0_-20px_80px_rgba(0,232,122,0.04)]">
          <GuardianDashboard />
        </div>
      </motion.div>
    </section>
  );
}
