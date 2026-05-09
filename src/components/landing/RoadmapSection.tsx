import { motion } from "framer-motion";

const MILESTONES = [
  { q: "Q2 2026", title: "Guardian Live",     desc: "Beta mainnet, design partners",                    done: true  },
  { q: "Q3 2026", title: "Public SDK",         desc: "elizaOS plugin, TypeScript bindings",              done: false },
  { q: "Q4 2026", title: "Enterprise Tier",    desc: "VPC deployment, SLA, custom rules",                done: false },
  { q: "Q1 2027", title: "Full Kernel",        desc: "Reflex Engine + ZK State production",              done: false },
];

export function RoadmapSection() {
  return (
    <section className="py-24 px-10 max-w-6xl mx-auto bg-[#060a08]">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-xs text-[#00e87a] uppercase tracking-widest font-mono mb-4"
      >
        Roadmap
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="text-4xl font-bold mb-16 font-display"
      >
        Built for the long game.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        className="relative"
      >
        <div className="absolute top-3 left-0 right-0 h-[1px] bg-white/10" />
        <div className="absolute top-3 left-0 w-1/4 h-[1px] bg-[#00e87a]" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MILESTONES.map((item) => (
            <div key={item.q} className="pt-8">
              <div className={`w-6 h-6 rounded-full border-2 mb-4 -mt-11 ${
                item.done ? "bg-[#00e87a] border-[#00e87a]" : "bg-[#060a08] border-white/20"
              }`}/>
              <div className="text-xs font-mono text-white/30 mb-2">{item.q}</div>
              <div className="font-semibold text-white mb-1">{item.title}</div>
              <div className="text-sm text-white/40">{item.desc}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
