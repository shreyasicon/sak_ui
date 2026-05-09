import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import content from "../../content.json";

const { news_incidents: ni } = content;

const SEVERITY_COLORS: Record<string, { text: string; dot: string }> = {
  critical: { text: "text-red-400", dot: "bg-red-500" },
  high:     { text: "text-orange-400", dot: "bg-orange-500" },
  medium:   { text: "text-yellow-400", dot: "bg-yellow-500" },
  low:      { text: "text-white/30", dot: "bg-white/20" },
};

export function IncidentSection() {
  const urgencyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(urgencyRef, { once: true });
  const [urgencyDisplay, setUrgencyDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const match = ni.urgency_stat.value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
    if (!match) { setUrgencyDisplay(ni.urgency_stat.value); return; }
    const num = parseFloat(match[2]!);
    const prefix = match[1]!;
    const suffix = match[3]!;
    const controls = animate(0, num, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const rounded = Number.isInteger(num) ? Math.round(v) : v.toFixed(1);
        setUrgencyDisplay(`${prefix}${rounded}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView]);

  const renderCard = (incident: typeof ni.incidents[0], key: number) => {
    const colors = SEVERITY_COLORS[incident.severity] ?? SEVERITY_COLORS.medium;
    const hasUrl = incident.url && incident.url !== "[paste URL]";
    const showAmount = incident.amount && incident.amount !== "N/A";

    const content_ = (
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-[#0f0f1a] whitespace-nowrap shrink-0 hover:border-white/20 transition-colors duration-200">
        {/* thumbnail */}
        <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#0a0a14] shrink-0 flex items-center justify-center">
          <img
            src={incident.image}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = "none";
              const fb = img.nextElementSibling;
              if (fb) (fb as HTMLElement).style.display = "flex";
            }}
          />
          <span style={{ display: "none" }} className="font-mono text-[8px] text-white/20 items-center justify-center w-full h-full">
            {incident.publication.charAt(0)}
          </span>
        </div>
        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} shrink-0`} />
        <span className="font-mono text-[11px] text-white/40 uppercase tracking-widest">
          {incident.publication}
        </span>
        <span className="text-white/15">|</span>
        <span className={`font-mono text-[12px] font-bold ${colors.text}`}>
          {showAmount ? incident.amount : incident.severity === "critical" ? "CRITICAL" : incident.severity.toUpperCase()}
        </span>
        <span className="text-white/15">|</span>
        <span className="text-white/80 text-[13px] font-medium truncate max-w-[320px]">
          {incident.headline}
        </span>
        {hasUrl && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/30 shrink-0 ml-1">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    );

    if (hasUrl) {
      return (
        <a key={key} href={incident.url} target="_blank" rel="noopener noreferrer" className="shrink-0">
          {content_}
        </a>
      );
    }
    return <div key={key} className="shrink-0">{content_}</div>;
  };

  return (
    <section className="relative py-24 bg-[#080810] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5"
        >
          <span className="font-display text-[10px] tracking-[0.2em] text-red-400 uppercase">
            {ni.section_label}
          </span>
        </motion.div>

        {/* ── headline + sub ── */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="font-display font-bold text-4xl sm:text-5xl text-white leading-[1.1] mb-3"
        >
          {ni.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
          className="text-[#8888aa] text-[15px] max-w-xl mb-12"
        >
          {ni.sub}
        </motion.p>

        {/* ── ticker ── */}
        <div className="overflow-hidden mb-12">
          <div className="animate-marquee flex gap-3" style={{ width: "max-content" }}>
            {[...ni.incidents, ...ni.incidents].map((incident, i) =>
              renderCard(incident, i)
            )}
          </div>
        </div>

        {/* ── urgency block ── */}
        <motion.div
          ref={urgencyRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-12 p-8 rounded-xl text-center bg-red-500/[0.04] border border-red-500/12"
        >
          <span className="font-mono text-5xl font-bold text-red-400 block mb-2">
            {urgencyDisplay}
          </span>
          <p className="text-white/40 text-base mb-6">
            {ni.urgency_stat.label}
          </p>
          <a
            href={ni.urgency_stat.cta_target}
            className="inline-block px-6 py-3 bg-[#00e87a] text-[#080810] font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            {ni.urgency_stat.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
