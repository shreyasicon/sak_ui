import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import content from "../../content.json";

export function RoadmapSection() {
  const { roadmap } = content;
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 bg-[#070c07] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(34,197,94,0.05)_0%,transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="font-display text-[10px] tracking-[0.3em] text-green-400/70 border-b border-green-500/20 pb-2">
            {roadmap.sectionLabel}
          </span>
        </motion.div>

        {/* timeline */}
        <div ref={ref} className="relative">

          {/* horizontal line track */}
          <div className="absolute top-4 left-0 right-0 h-px bg-green-500/10" />

          {/* animated fill line */}
          <motion.div
            className="absolute top-4 left-0 h-px bg-gradient-to-r from-green-500 via-green-400 to-green-500/30"
            initial={{ width: "0%" }}
            animate={inView ? { width: "75%" } : { width: "0%" }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {roadmap.milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative pt-10"
              >
                {/* dot */}
                <motion.div
                  className={`absolute top-2 left-0 w-4 h-4 -translate-y-1/2 rounded-full border-2 transition-all ${
                    m.active
                      ? "bg-green-400 border-green-400 shadow-[0_0_12px_rgba(74,222,128,0.7)]"
                      : "bg-[#070c07] border-green-500/40"
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15, type: "spring", stiffness: 300 }}
                />
                {/* active pulse ring */}
                {m.active && (
                  <div className="absolute top-2 left-0 w-4 h-4 -translate-y-1/2 rounded-full border border-green-400/40 animate-ping" />
                )}

                <div className="space-y-1">
                  <div className={`font-display text-[10px] tracking-widest ${m.active ? "text-green-400" : "text-gray-600"}`}>
                    {m.quarter}
                  </div>
                  <div className="font-display font-bold text-sm text-white leading-tight">
                    {m.title}
                  </div>
                  <div className="text-gray-500 text-xs">{m.subtitle}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
