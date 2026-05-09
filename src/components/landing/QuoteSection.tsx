import { motion } from "framer-motion";

export function QuoteSection() {
  return (
    <section className="py-24 px-10 max-w-4xl mx-auto text-center bg-[#060a08]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-5xl text-white/10 font-serif mb-6">"</div>
        <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed text-white mb-8">
          Someone sent a Morse code message to Grok. The bot decoded it. $200,000 left the wallet in one transaction. No check caught it.
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-[1px] bg-white/20"/>
          <span className="text-sm text-white/40 font-mono">Documented incident · April 2026</span>
          <div className="w-8 h-[1px] bg-white/20"/>
        </div>
        <p className="text-[#00e87a] text-sm font-mono mt-6">
          SAK's Guardian would have blocked it in 43ms.
        </p>
      </motion.div>
    </section>
  );
}
