import { motion } from "framer-motion";
import content from "../../content.json";

const { news_incidents: ni } = content;

const SEVERITY: Record<string, { text: string; dot: string; badge: string }> = {
  critical: { text: "text-red-400", dot: "bg-red-500", badge: "bg-red-500/15 border-red-500/30 text-red-400" },
  high: { text: "text-orange-400", dot: "bg-orange-500", badge: "bg-orange-500/15 border-orange-500/30 text-orange-400" },
  medium: { text: "text-yellow-400", dot: "bg-yellow-500", badge: "bg-yellow-500/15 border-yellow-500/30 text-yellow-400" },
  low: { text: "text-white/30", dot: "bg-white/20", badge: "bg-white/5 border-white/10 text-white/30" },
};

export function IncidentSection() {

  return (
    <section className="relative py-24 bg-[#080810]/88 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_50%,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.45)_55%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* label */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="inline-block font-mono text-[10px] tracking-[0.2em] text-red-400 uppercase mb-4"
        >
          {ni.section_label}
        </motion.span>

        {/* headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="font-display font-bold text-4xl sm:text-5xl text-white leading-[1.1] mb-3"
        >
          {ni.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-[#8888aa] text-[15px] max-w-xl mb-12"
        >
          {ni.sub}
        </motion.p>

        {/* card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {ni.incidents.map((incident, i) => {
            const s = SEVERITY[incident.severity] ?? SEVERITY.medium!;
            const hasUrl = incident.url && incident.url !== "[paste URL]";
            const showAmount = incident.amount && incident.amount !== "N/A";

            const card = (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="group rounded-xl border border-white/[0.08] bg-[#0d0d18] overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                {/* image */}
                <div className="relative w-full h-40 bg-[#0a0a14] overflow-hidden shrink-0">
                  <img
                    src={incident.image}
                    alt={incident.publication}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.opacity = "0";
                    }}
                  />
                  {/* dark gradient so badges sit cleanly */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18]/80 to-transparent" />

                  {/* severity badge */}
                  <div className={`absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md border backdrop-blur-sm text-[9px] font-mono uppercase tracking-widest ${s.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {incident.severity}
                  </div>

                  {/* amount */}
                  {showAmount && (
                    <div className={`absolute top-2.5 right-2.5 px-2 py-1 rounded-md border backdrop-blur-sm font-mono text-[11px] font-bold ${s.badge}`}>
                      {incident.amount}
                    </div>
                  )}
                </div>

                {/* content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                      {incident.publication}
                    </span>
                    {hasUrl && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-white/25 group-hover:text-white/50 transition-colors shrink-0">
                        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <p className="text-white/75 text-[13px] leading-snug line-clamp-3 flex-1">
                    {incident.headline}
                  </p>
                </div>
              </motion.div>
            );

            return hasUrl ? (
              <a key={i} href={incident.url} target="_blank" rel="noopener noreferrer" className="flex flex-col">
                {card}
              </a>
            ) : (
              <div key={i} className="flex flex-col">{card}</div>
            );
          })}
        </div>

        {/* urgency block */}
        {/* <motion.div
          ref={urgencyRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="p-8 rounded-xl text-center bg-red-500/[0.04] border border-red-500/12"
        >
          <span className="font-mono text-5xl font-bold text-red-400 block mb-2">
            {urgencyDisplay}
          </span>
          <p className="text-white/40 text-base mb-6">{ni.urgency_stat.label}</p>
          <a
            href={ni.urgency_stat.cta_target}
            className="inline-block px-6 py-3 bg-[#00e87a] text-[#080810] font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            {ni.urgency_stat.cta}
          </a>
        </motion.div> */}
      </div>
    </section>
  );
}
