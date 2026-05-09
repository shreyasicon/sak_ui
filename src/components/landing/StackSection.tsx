import { motion } from "framer-motion";
import { Brain, Hand, Shield } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

const NODES = [
  { label: "LLM",                  dim: true  },
  { label: "elizaOS / Agent Kit",  dim: true  },
  { label: "SAK",                  dim: false, star: true },
  { label: "Solana",               dim: true  },
];

const COLUMNS = [
  { icon: Brain, title: "elizaOS is the brain.",       body: "The LLM decides what to do. It generates intent and asks the agent to act." },
  { icon: Hand,  title: "Solana Agent Kit is the hands.", body: "It executes. Builds and submits transactions to the network on the agent's behalf." },
  { icon: Shield,title: "SAK is the nervous system.",   body: "It validates. Every action passes through before it reaches the chain." },
];

export function StackSection() {
  return (
    <section className="relative py-36 bg-[#060a08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── labels ── */}
        <motion.div {...fadeUp(0)} className="mb-5">
          <span className="font-display text-[10px] tracking-[0.2em] text-[#00e87a] uppercase">
            The Stack
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp(0.08)}
          className="font-display font-bold text-4xl sm:text-5xl text-white leading-[1.1] mb-20"
        >
          One import. Under your<br />existing framework.
        </motion.h2>

        {/* ── horizontal stack diagram ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="flex items-center justify-center gap-0 mb-20 overflow-x-auto py-4"
        >
          {NODES.map((node, i) => (
            <div key={node.label} className="flex items-center shrink-0">
              {/* node box */}
              <div className={`
                relative px-5 py-3 rounded-lg border text-[13px] font-display font-bold tracking-wide transition-all
                ${node.dim
                  ? "border-white/[0.08] text-[#8888aa] bg-white/[0.02]"
                  : "border-[#00e87a]/40 text-white bg-[#00e87a]/[0.06] shadow-[0_0_24px_rgba(0,232,122,0.06)]"
                }
              `}>
                {node.label}
                {node.star && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#00e87a] flex items-center justify-center text-black text-[8px] font-bold leading-none">★</span>
                )}
              </div>

              {/* arrow connector */}
              {i < NODES.length - 1 && (
                <div className="flex items-center gap-0 mx-1">
                  <div className="flex gap-0.5">
                    {[0,1,2,3].map((d) => (
                      <span key={d} className="w-1 h-px bg-white/20" />
                    ))}
                  </div>
                  <svg width="8" height="8" viewBox="0 0 8 8" className="text-white/25 ml-0.5">
                    <path d="M0 4h7M4 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* ── three text columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLUMNS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.1 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#00e87a]/10 flex items-center justify-center text-[#00e87a] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-white/80 text-[15px] leading-relaxed font-medium">{title}</p>
              </div>
              <p className="text-[#8888aa] text-[14px] leading-relaxed pl-[52px]">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
