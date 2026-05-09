import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

const OLD_ITEMS = [
  "Detect after exploit", "Human intervention",
  "Signature-based rules", "High false positives", "Reactive protection",
];
const SAK_ITEMS = [
  "Prevent before execution", "Autonomous response",
  "Intent-based simulation", "Zero false negatives", "Proactive protection",
];
const STATS = [
  { value: "$1.8B+", label: "Lost to AI Agent Exploits in 2025" },
  { value: "26",     label: "Active malicious LLM routers found April 2026" },
  { value: "43ms",   label: "Time for SAK to stop a malicious intent" },
];

export function ComparisonSection() {
  return (
    <section className="py-24 bg-[#080810] overflow-hidden">
      <div className="max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: headline + stats */}
          <div>
            <motion.div {...fadeUp(0)} className="mb-5">
              <span className="font-display text-[10px] tracking-[0.2em] text-[#00e87a] uppercase">The Problem</span>
            </motion.div>
            <motion.h2 {...fadeUp(0.08)} className="text-4xl sm:text-5xl font-bold leading-tight mb-6 font-display">
              Web3 Security<br/>Is <span className="text-[#00e87a]">Reactive.</span>
            </motion.h2>
            <motion.p {...fadeUp(0.14)} className="text-white/50 text-lg leading-relaxed">
              Exploits happen in milliseconds. Traditional security detects after the transaction. On-chain, that's already too late.
            </motion.p>
            <motion.div {...fadeUp(0.2)} className="mt-12 space-y-8">
              {STATS.map(stat => (
                <div key={stat.value}>
                  <div className="text-3xl sm:text-4xl font-bold text-[#00e87a] font-mono">{stat.value}</div>
                  <div className="text-white/40 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: comparison table */}
          <motion.div {...fadeUp(0.14)} className="grid grid-cols-2 gap-4 mt-12 lg:mt-0">
            {/* Old */}
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5">
              <div className="text-xs text-white/30 uppercase tracking-widest font-mono mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block"/>
                Old Security
              </div>
              {OLD_ITEMS.map(item => (
                <div key={item} className="flex items-center gap-3 py-3 border-t border-white/5 text-sm text-white/40">
                  <span className="text-red-500">✕</span>
                  {item}
                </div>
              ))}
            </div>

            {/* SAK */}
            <div className="bg-[#00e87a]/[0.04] rounded-xl p-6 border border-[#00e87a]/20">
              <div className="text-xs text-[#00e87a] uppercase tracking-widest font-mono mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00e87a] inline-block"/>
                SAK Security
              </div>
              {SAK_ITEMS.map(item => (
                <div key={item} className="flex items-center gap-3 py-3 border-t border-[#00e87a]/10 text-sm text-white">
                  <span className="text-[#00e87a]">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
