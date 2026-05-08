import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import content from "../../content.json";

export function CTASection() {
  const { cta } = content;

  return (
    <section className="relative py-28 bg-[#070c07] overflow-hidden">

      {/* ── layered glow background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-40 bg-green-500/8 blur-3xl rounded-full animate-shimmer" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-20 bg-green-400/10 blur-2xl rounded-full" />
        {/* decorative sparkle shapes */}
        <motion.div
          className="absolute right-12 top-1/4 text-green-400/30 text-4xl font-bold select-none"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.div>
        <motion.div
          className="absolute left-16 bottom-1/3 text-green-400/20 text-2xl font-bold select-none"
          animate={{ rotate: [0, -20, 20, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          ✦
        </motion.div>
      </div>

      {/* subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8">

        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight"
        >
          {cta.headingLine1}
          <br />
          {cta.headingLine2Start}
          <span className="text-green-400 glow-green-text">{cta.headingLine2Highlight}</span>
        </motion.h2>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href={cta.buttons[0].href} className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-display font-bold text-sm rounded-lg transition-all duration-200 glow-green">
            {cta.buttons[0].label}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href={cta.buttons[1].href} className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white font-display text-sm rounded-lg transition-all duration-200 hover:bg-white/5">
            <Calendar className="w-4 h-4" />
            {cta.buttons[1].label}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
