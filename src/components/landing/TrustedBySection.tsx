import { motion } from "framer-motion";
import content from "../../content.json";

export function TrustedBySection() {
  const { trustedBy } = content;
  // duplicate for seamless loop
  const doubled = [...trustedBy.logos, ...trustedBy.logos];

  return (
    <section className="relative py-10 border-y border-green-500/10 bg-[#060a06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <p className="font-display text-[10px] tracking-[0.3em] text-green-600/60">
            {trustedBy.label}
          </p>
          <p className="font-display text-[9px] tracking-[0.2em] text-gray-600 uppercase">
            {trustedBy.note}
          </p>
        </motion.div>
      </div>

      {/* marquee track */}
      <div className="relative overflow-hidden">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060a06] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060a06] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-10 min-w-max"
            >
              <span className="font-display text-sm font-bold tracking-widest text-gray-500 hover:text-green-400 transition-colors duration-300 cursor-default select-none uppercase whitespace-nowrap">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
