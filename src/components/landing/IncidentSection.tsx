import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

export function IncidentSection() {
  return (
    <section className="relative py-36 bg-[#080810] overflow-hidden">
      <div className="max-w-[680px] mx-auto px-6">

        {/* ── red incident badge ── */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/8 text-red-400 text-[10px] tracking-[0.12em] font-display">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            INCIDENT — APRIL 2026
          </span>
        </motion.div>

        {/* ── pull quote ── */}
        <motion.blockquote
          {...fadeUp(0.12)}
          className="font-display font-bold text-3xl sm:text-4xl leading-[1.25] text-white mb-14"
        >
          "Someone sent a Morse code message to&nbsp;Grok.
          The bot decoded it. $200,000 left the wallet in one
          transaction. No check caught it."
        </motion.blockquote>

        {/* ── two-column comparison ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          className="grid grid-cols-2 gap-0 border border-white/[0.07] rounded-xl overflow-hidden"
        >
          {/* left: without SAK */}
          <div className="p-7 border-r border-white/[0.07]">
            <div className="font-display text-[10px] tracking-[0.18em] text-red-400/80 mb-4 uppercase">
              Without SAK
            </div>
            <p className="text-[#8888aa] text-[15px] leading-relaxed">
              The drain executes.<br />
              Transaction signs. SOL leaves.<br />
              <span className="text-white/60">No log. No warning.</span><br />
              <span className="text-white/40">Nothing left to inspect.</span>
            </p>
          </div>

          {/* right: with SAK */}
          <div className="p-7 bg-[#00e87a]/[0.025]">
            <div className="font-display text-[10px] tracking-[0.18em] text-[#00e87a]/80 mb-4 uppercase">
              With SAK
            </div>
            <p className="text-[#8888aa] text-[15px] leading-relaxed">
              The Guardian fires<br />
              <span className="text-white font-medium">43ms before signing.</span><br />
              <span className="text-white/60">RULE-07 catches the delegate.</span><br />
              <span className="text-[#00e87a]/80">$0 on-chain. Wallet intact.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
