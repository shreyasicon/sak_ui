import { motion } from "framer-motion";
import { ArrowRight, Cpu, ShieldCheck, Network } from "lucide-react";
import content from "../../content.json";

export function HowItWorksSection() {
  const { howItWorks } = content;

  return (
    <section className="relative py-24 bg-[#080810] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,232,122,0.055)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-display text-[10px] tracking-[0.3em] text-green-400/75 border border-green-500/20 px-3 py-1 rounded bg-green-500/5">
            {howItWorks.sectionLabel}
          </span>
        </motion.div>

        {/* Stack diagram */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 mb-14"
        >
          {howItWorks.diagram.map((node, index) => (
            <div key={node} className="flex flex-col md:flex-row items-center gap-3">
              <div
                className={`min-w-[190px] px-5 py-4 rounded-xl border text-center bg-[#090b14]/80 backdrop-blur-sm ${
                  node.includes("SAK")
                    ? "border-green-400/70 glow-green text-green-300"
                    : "border-green-500/15 text-gray-300"
                }`}
              >
                <div className="font-display font-bold text-sm tracking-wide">{node}</div>
              </div>
              {index < howItWorks.diagram.length - 1 && (
                <ArrowRight className="w-5 h-5 text-green-500/50 rotate-90 md:rotate-0" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
          transition={{ staggerChildren: 0.14 }}
          className="grid md:grid-cols-3 gap-5"
        >
          {howItWorks.steps.map((step, index) => {
            const icons = [Cpu, ShieldCheck, Network];
            const Icon = icons[index];

            return (
              <motion.div
                key={step}
                variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 border border-green-500/12 rounded-xl bg-[#090b14] card-hover-glow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg border border-green-500/25 bg-green-500/8 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-display text-green-400 text-xs mb-2">0{index + 1}</div>
                    <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
