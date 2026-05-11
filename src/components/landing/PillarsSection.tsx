import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

export function PillarsSection() {
  return (
    <section className="py-24 bg-[#080810] overflow-hidden">
      <div className="max-w-6xl mx-auto px-10">
        <motion.p {...fadeUp(0)} className="text-xs text-[#00e87a] uppercase tracking-widest font-mono text-center mb-4">
          Three Pillars of Safety
        </motion.p>
        <motion.h2 {...fadeUp(0.08)} className="text-4xl sm:text-5xl font-bold text-center mb-16 font-display">
          Built for agents moving real capital.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* GUARDIAN — large, spans 2 cols */}
          <motion.div {...fadeUp(0.14)} className="lg:col-span-2 bg-white/[0.02] rounded-2xl border border-white/5 p-8 overflow-hidden relative">
            <div className="w-full h-48 bg-[#0f0f1a] rounded-xl mb-6 overflow-hidden border border-white/5">
              <div className="p-4 font-mono text-xs">
                <div className="flex gap-2 mb-3">
                  <span className="text-[#00e87a]">● BLOCKED</span>
                  <span className="text-white/30 ml-auto">43ms</span>
                </div>
                <div className="text-white/60 mb-1">99% Slippage Swap</div>
                <div className="text-white/30 text-[10px]">Rule: max_slippage — 9900bps {'>'} 200bps</div>
                <div className="text-[#00e87a] text-[10px] mt-1">Prevented loss: ~$498.50</div>
                <div className="mt-3 flex gap-2 mb-3">
                  <span className="text-[#00e87a]">● ALLOWED</span>
                  <span className="text-white/30 ml-auto">38ms</span>
                </div>
                <div className="text-white/60 mb-1">Valid USDC Transfer</div>
                <div className="text-[#00e87a] text-[10px]">All 7 rules passed ✓</div>
              </div>
            </div>
            <div className="text-[#00e87a] text-xs font-mono uppercase tracking-widest mb-2">Guardian</div>
            <h3 className="text-2xl font-bold mb-3">Pre-sign Simulation Engine</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Simulates every transaction in LiteSVM with mathematical certainty before signing. 20 attack patterns blocked. Zero on-chain cost for rejections.
            </p>
            <div className="flex gap-6 mt-6">
              {[
                { v: "20/20", l: "Attack patterns" },
                { v: "7", l: "Active rules" },
                { v: "$0", l: "Cost per rejection" },
              ].map(s => (
                <div key={s.v}>
                  <div className="text-lg font-bold font-mono text-white">{s.v}</div>
                  <div className="text-xs text-white/30">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* REFLEX ENGINE — small card */}
          <motion.div {...fadeUp(0.2)} className="bg-white/[0.02] rounded-2xl border border-white/5 p-8">
            <div className="text-[#00e87a] text-xs font-mono uppercase tracking-widest mb-2">Reflex Engine</div>
            <h3 className="text-xl font-bold mb-3">Same-Slot Threat Awareness</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Yellowstone Geyser. No polling. React within 50ms of on-chain events. Polling agents are always 3 slots behind.
            </p>
            <div className="mt-6 p-3 bg-[#00e87a]/5 rounded-lg border border-[#00e87a]/10">
              <div className="text-2xl font-bold font-mono text-[#00e87a]">{'<'}50ms</div>
              <div className="text-xs text-white/30 mt-1">Geyser push · No polling</div>
            </div>
          </motion.div>

          {/* ZK STATE — full width bottom */}
          <motion.div {...fadeUp(0.26)} className="lg:col-span-3 bg-white/[0.02] rounded-2xl border border-white/5 p-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1">
              <div className="text-[#00e87a] text-xs font-mono uppercase tracking-widest mb-2">ZK State</div>
              <h3 className="text-xl font-bold mb-3">Compressed Secure State</h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-lg">
                Light Protocol ZK compression. 1,000 agents storing state on-chain costs $300,000 in rent. With SAK: $300.
              </p>
            </div>
            <div className="flex items-center gap-6 lg:gap-12 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold font-mono text-white/20 line-through">$300,000</div>
                <div className="text-xs text-white/20 mt-1">Regular accounts</div>
              </div>
              <div className="text-2xl text-white/20">→</div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold font-mono text-[#00e87a]">$300</div>
                <div className="text-xs text-white/30 mt-1">With ZK compression</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
