import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check } from "lucide-react";
import content from "../../content.json";

const listItem = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0   },
};

const listContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export function SecuritySection() {
  const { security } = content;
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 bg-[#070c07] overflow-hidden">
      {/* subtle glow blob */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(34,197,94,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr_1fr] gap-8 items-start">

          {/* ── Left: heading ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
              {security.heading}
              <br />
              {security.headingLine2}
              <span className="text-green-400 glow-green-text">{security.headingHighlight}</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">{security.subtext}</p>
          </motion.div>

          {/* ── Center: comparison table ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="grid grid-cols-[1fr_auto_1fr] gap-0 border border-green-500/15 rounded-xl overflow-hidden bg-[#080e08]">

              {/* Old Security column */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="font-display text-[9px] tracking-[0.2em] text-gray-500">
                    {security.comparison.old.label}
                  </span>
                  <span className="ml-auto text-gray-600">›</span>
                </div>
                <motion.ul
                  variants={listContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {security.comparison.old.items.map((item) => (
                    <motion.li
                      key={item}
                      variants={listItem}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <X className="w-3.5 h-3.5 text-red-500/70 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* VS divider */}
              <div className="flex flex-col items-center justify-center px-2 border-x border-green-500/10">
                <div className="w-px flex-1 bg-gradient-to-b from-transparent via-green-500/20 to-transparent" />
                <span className="font-display text-xs font-bold text-green-500/60 py-3 bg-[#0a130a] border border-green-500/20 rounded-full w-10 h-10 flex items-center justify-center">
                  VS
                </span>
                <div className="w-px flex-1 bg-gradient-to-b from-transparent via-green-500/20 to-transparent" />
              </div>

              {/* SAK Security column */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="font-display text-[9px] tracking-[0.2em] text-green-400/80">
                    {security.comparison.sak.label}
                  </span>
                </div>
                <motion.ul
                  variants={listContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {security.comparison.sak.items.map((item) => (
                    <motion.li
                      key={item}
                      variants={listItem}
                      className="flex items-center gap-2 text-sm text-green-300/80"
                    >
                      <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>

          {/* ── Right: stats ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            {security.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                className="border-b border-green-500/10 pb-5 last:border-0"
              >
                <div className="font-display font-bold text-3xl md:text-4xl text-green-400 glow-green-text">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
