import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GuardianDashboard } from "./GuardianDashboard";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

export function DemoSection() {
  return (
    <section className="relative py-36 bg-[#060a08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── labels ── */}
        <motion.div {...fadeUp(0)} className="mb-5 text-center">
          <span className="font-display text-[10px] tracking-[0.2em] text-[#00e87a] uppercase">
            Live Demo
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp(0.08)}
          className="font-display font-bold text-4xl sm:text-5xl text-white leading-[1.1] mb-16 text-center"
        >
          Watch it block attacks<br />in real time.
        </motion.h2>

        {/* ── browser mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)] mb-12"
        >
          {/* fake browser chrome */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#090912] border-b border-white/[0.06]">
            {/* traffic lights */}
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00e87a]/50" />
            </div>

            {/* address bar */}
            <div className="flex-1 flex items-center gap-2 px-3 py-1 bg-[#0a0a14] rounded-md border border-white/[0.06] max-w-sm mx-auto">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="text-[#00e87a]/60 shrink-0">
                <path d="M5 0C2.8 0 1 1.8 1 4v1H0v7h10V5H9V4C9 1.8 7.2 0 5 0zm0 1.5C6.4 1.5 7.5 2.6 7.5 4v1h-5V4C2.5 2.6 3.6 1.5 5 1.5z" fill="currentColor"/>
              </svg>
              <span className="font-mono text-[11px] text-[#8888aa]">guardian.sak.dev/dashboard</span>
            </div>

            {/* right icons */}
            <div className="flex items-center gap-2 ml-auto">
              <div className="w-4 h-4 rounded bg-white/[0.04] flex items-center justify-center">
                <div className="w-1.5 h-1.5 border border-white/20 rounded-sm" />
              </div>
            </div>
          </div>

          {/* dashboard content */}
          <GuardianDashboard />
        </motion.div>

        {/* ── CTA ── */}
        <motion.div {...fadeUp(0.3)} className="flex flex-col items-center gap-3">
          <a
            href="#waitlist-form"
            className="flex items-center gap-2 h-12 px-7 bg-[#00e87a] text-black text-[15px] font-bold rounded-lg hover:bg-[#00ff87] transition-colors duration-200"
          >
            Request for Demo
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[#8888aa] text-[12px]">
            Get a personalized walkthrough of SAK Guardian.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
