import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldAlert, Activity } from "lucide-react";
import content from "../../content.json";

export function DemoPreviewSection() {
  const { demoPreview } = content;

  return (
    <section className="relative py-24 bg-[#06070d] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(0,232,122,0.055)_0%,transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.3fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5"
        >
          <span className="font-display text-[10px] tracking-[0.28em] text-green-400/70 uppercase">
            LIVE DEMO PREVIEW
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
            {demoPreview.heading}
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            {demoPreview.subtext}
          </p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-display font-bold text-sm rounded transition-all duration-200 glow-green">
            {demoPreview.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Demo dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="border border-green-500/20 rounded-2xl bg-[#080810] overflow-hidden glow-green-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/10 bg-[#05070b]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="font-display text-[10px] text-green-400/70 tracking-[0.2em]">GUARDIAN LIVE</span>
              <span className="font-display text-[9px] text-gray-600">50ms</span>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-green-500/10">
              {demoPreview.panels.map((panel, panelIndex) => {
                const Icon = panelIndex === 0 ? Activity : panelIndex === 1 ? ShieldAlert : CheckCircle2;

                return (
                  <div key={panel.title} className="bg-[#080810] p-5 min-h-[260px]">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 rounded-lg border border-green-500/25 bg-green-500/8 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-green-400" />
                      </div>
                      <h3 className="font-display font-bold text-xs text-white">{panel.title}</h3>
                    </div>

                    <div className="space-y-3">
                      {panel.items.map((item, itemIndex) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: 0.3 + panelIndex * 0.12 + itemIndex * 0.12 }}
                          className="relative pl-5 font-display text-[10px] text-gray-400 leading-relaxed"
                        >
                          <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(0,232,122,0.9)]" />
                          {item}
                        </motion.div>
                      ))}
                    </div>

                    {/* animated trace */}
                    <div className="mt-8 h-14 rounded-lg border border-green-500/10 bg-[#05070b] overflow-hidden relative">
                      <motion.div
                        className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
                        animate={{ x: ["-30%", "130%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: panelIndex * 0.35 }}
                        style={{ width: "70%" }}
                      />
                      <div className="absolute inset-0 bg-grid opacity-30" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
