import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Shield, Zap, Target, ArrowRight, FileText } from "lucide-react";
import content from "../../content.json";

/* ─── animated number counter ──────────────────── */
function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 1.8,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

/* ─── hero device SVG ───────────────────────────── */
function HeroDevice() {
  const [logs, setLogs] = useState<Array<(typeof content.hero.terminal.logs)[number]>>([]);

  useEffect(() => {
    const allLogs = content.hero.terminal.logs.filter(Boolean);
    let i = 0;

    const id = window.setInterval(() => {
      const nextLog = allLogs[i];

      if (!nextLog) {
        window.clearInterval(id);
        return;
      }

      setLogs((prev) => [...prev, nextLog]);
      i += 1;
    }, 700);

    return () => window.clearInterval(id);
  }, []);

  const logColor: Record<string, string> = {
    warn:  "text-yellow-400",
    info:  "text-gray-400",
    allow: "text-green-400",
    block: "text-red-400",
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">

      {/* ── outer glow halos ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-green-400/8 blur-2xl animate-pulse-ring" />
      </div>

      {/* ── floating capability cards ── */}
      {content.hero.floatingCards.map((card, index) => {
        const positions = [
          "top-14 left-2 md:left-8",
          "top-24 right-0 md:right-6",
          "bottom-28 left-0 md:left-4",
          "bottom-20 right-2 md:right-10",
        ];

        return (
          <motion.div
            key={card}
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.5, delay: 1.1 + index * 0.12 },
              scale: { duration: 0.5, delay: 1.1 + index * 0.12 },
              y: { duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 },
            }}
            className={`absolute z-20 hidden sm:block ${positions[index]} px-3 py-2 rounded-lg border border-green-500/25 bg-[#080810]/70 backdrop-blur-md glow-green-sm`}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(0,232,122,0.9)]" />
              <span className="font-display text-[9px] tracking-[0.18em] text-green-300/90 whitespace-nowrap">
                {card}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* ── rotating orbit rings ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-56 h-56 pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-green-500/20 animate-spin-slow" />
        <div className="absolute inset-4 rounded-full border border-green-500/15 animate-spin-slow2" />
        {/* orbit dot */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)] animate-spin-slow" style={{ transformOrigin: "0 112px" }} />
      </div>

      {/* ── device body (SVG) ── */}
      <motion.div
        className="relative z-10 animate-float"
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <svg viewBox="0 0 260 340" className="w-56 h-72 md:w-64 md:h-80 drop-shadow-2xl">
          <defs>
            {/* beam gradient */}
            <linearGradient id="beamGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%"   stopColor="#22c55e" stopOpacity="0.9" />
              <stop offset="60%"  stopColor="#4ade80" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#86efac" stopOpacity="0"   />
            </linearGradient>
            {/* side beam */}
            <linearGradient id="sideBeamL" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%"   stopColor="#22c55e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0"   />
            </linearGradient>
            <linearGradient id="sideBeamR" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#22c55e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0"   />
            </linearGradient>
            {/* body gradient */}
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0f1f0f" />
              <stop offset="100%" stopColor="#050a05" />
            </linearGradient>
            {/* platform gradient */}
            <linearGradient id="platGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0d1a0d" />
              <stop offset="100%" stopColor="#040804" />
            </linearGradient>
            {/* inner glow */}
            <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#22c55e" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0"    />
            </radialGradient>
            {/* scan */}
            <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#4ade80" stopOpacity="0" />
              <stop offset="50%"  stopColor="#4ade80" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
            </linearGradient>
            <clipPath id="bodyClip">
              <rect x="65" y="120" width="130" height="170" rx="6" />
            </clipPath>
          </defs>

          {/* ─── main light beam going up ─── */}
          <motion.polygon
            points="105,120 155,120 195,0 65,0"
            fill="url(#beamGrad)"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 }}
            style={{ transformOrigin: "130px 120px" }}
          />

          {/* ─── side scatter beams ─── */}
          <motion.polygon
            points="65,120 105,120 40,30 10,30"
            fill="url(#sideBeamL)" opacity="0.4"
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
            transition={{ delay: 0.9, duration: 1.2 }}
          />
          <motion.polygon
            points="195,120 155,120 220,30 250,30"
            fill="url(#sideBeamR)" opacity="0.4"
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
            transition={{ delay: 0.9, duration: 1.2 }}
          />

          {/* ─── device body ─── */}
          <rect x="65" y="120" width="130" height="170" rx="6" fill="url(#bodyGrad)" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.6" />
          <rect x="65" y="120" width="130" height="170" rx="6" fill="url(#innerGlow)" />

          {/* wireframe lines on body */}
          {[140, 165, 190, 215, 240].map((y) => (
            <line key={y} x1="65" y1={y} x2="195" y2={y} stroke="#22c55e" strokeWidth="0.4" strokeOpacity="0.18" />
          ))}
          {[85, 105, 125, 145, 165, 185].map((x) => (
            <line key={x} x1={x} y1="120" x2={x} y2="290" stroke="#22c55e" strokeWidth="0.4" strokeOpacity="0.15" />
          ))}

          {/* scanning line (animated via CSS + clip) */}
          <g clipPath="url(#bodyClip)">
            <motion.rect
              x="65" width="130" height="2"
              fill="url(#scanGrad)"
              animate={{ y: [120, 290, 120] }}
              transition={{ duration: 3.5, ease: "linear", repeat: Infinity }}
            />
          </g>

          {/* ─── corner accents ─── */}
          {[
            [65, 120], [195, 120], [65, 290], [195, 290],
          ].map(([cx, cy], i) => (
            <rect key={i} x={cx - 3} y={cy - 3} width="6" height="6"
              fill="#22c55e" opacity="0.7"
              rx="1"
            />
          ))}

          {/* ─── SAK label on device ─── */}
          <text x="130" y="178" textAnchor="middle" fill="#4ade80" fontSize="13" fontFamily="Space Mono, monospace" fontWeight="700" opacity="0.9">
            SAK
          </text>
          <text x="130" y="193" textAnchor="middle" fill="#4ade80" fontSize="5.5" fontFamily="Space Mono, monospace" opacity="0.6" letterSpacing="2">
            GUARDIAN ACTIVE
          </text>

          {/* ─── status indicators ─── */}
          <circle cx="90"  cy="215" r="3" fill="#4ade80">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <text x="98" y="219" fill="#4ade80" fontSize="6" fontFamily="Space Mono, monospace" opacity="0.7">ONLINE</text>

          <circle cx="90" cy="232" r="3" fill="#22c55e" opacity="0.8" />
          <text x="98" y="236" fill="#6ee7b7" fontSize="6" fontFamily="Space Mono, monospace" opacity="0.6">SCANNING</text>

          <circle cx="90" cy="249" r="3" fill="#86efac" opacity="0.6" />
          <text x="98" y="253" fill="#86efac" fontSize="6" fontFamily="Space Mono, monospace" opacity="0.5">ZK-STATE: OK</text>

          {/* ─── platform base ─── */}
          <ellipse cx="130" cy="295" rx="80" ry="14" fill="url(#platGrad)" stroke="#22c55e" strokeWidth="0.8" strokeOpacity="0.4" />
          <ellipse cx="130" cy="295" rx="60" ry="10" fill="url(#platGrad)" stroke="#22c55e" strokeWidth="0.5" strokeOpacity="0.3" />

          {/* platform glow reflection */}
          <ellipse cx="130" cy="298" rx="45" ry="5" fill="#22c55e" opacity="0.06" />

          {/* ─── floating particles ─── */}
          {[
            [35, 80], [220, 100], [45, 200], [225, 180], [60, 260], [200, 260], [130, 40],
          ].map(([px, py], i) => (
            <circle key={i} cx={px} cy={py} r="1.5" fill="#4ade80" opacity="0.6">
              <animate
                attributeName="opacity"
                values="0.6;0;0.6"
                dur={`${2 + i * 0.4}s`}
                repeatCount="indefinite"
                begin={`${i * 0.3}s`}
              />
              <animate
                attributeName="cy"
                values={`${py};${py - 8};${py}`}
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* ─── top energy node ─── */}
          <motion.circle
            cx="130" cy="10" r="7"
            fill="#22c55e"
            initial={{ r: 4, opacity: 0 }}
            animate={{ r: [6, 9, 6], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.circle
            cx="130" cy="10" r="14"
            fill="none" stroke="#22c55e" strokeWidth="0.8"
            animate={{ r: [14, 20, 14], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
          />
        </svg>
      </motion.div>

      {/* ── terminal overlay ── */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: 20 }}
        animate={{ opacity: 1, y: 0,  x: 0  }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-0 right-0 md:-right-4 w-64 bg-[#060e06]/90 border border-green-500/30 rounded-lg p-3 backdrop-blur-sm font-display text-[9px] leading-4 glow-green-sm"
      >
        <div className="flex items-center gap-2 mb-2 border-b border-green-500/20 pb-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <span className="w-2 h-2 rounded-full bg-green-500/70" />
          </div>
          <span className="text-green-400/80 truncate">{content.hero.terminal.title}</span>
        </div>
        <div className="space-y-0.5 min-h-[60px]">
          {logs.filter(Boolean).map((log, i) => (
            <motion.div
              key={`${log.type}-${i}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={logColor[log.type] ?? "text-gray-400"}
            >
              {log.text}
            </motion.div>
          ))}
          {logs.length < content.hero.terminal.logs.length && (
            <span className="cursor-blink text-green-400" />
          )}
        </div>
        <div className="mt-2 pt-2 border-t border-green-500/15 text-green-600/70">
          {content.hero.terminal.footer}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── stat icon map ─────────────────────────── */
const StatIcon = ({ name }: { name: string }) => {
  const cls = "w-5 h-5 text-green-400";
  if (name === "shield") return <Shield className={cls} />;
  if (name === "zap")    return <Zap    className={cls} />;
  return                         <Target className={cls} />;
};

/* ─── main hero section ─────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 28 },
  animate:   { opacity: 1, y: 0  },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export function HeroSection() {
  const { hero } = content;

  return (
    <section className="relative min-h-screen bg-grid flex flex-col justify-center pt-16 overflow-hidden">

      {/* radial glow from right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_50%,rgba(34,197,94,0.07)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(34,197,94,0.04)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* ── Left Content ── */}
        <div className="space-y-6 relative z-10">

          {/* badge */}
          <motion.div {...fadeUp(0.1)}>
            <span className="font-display text-[10px] tracking-[0.2em] text-green-500/80 border border-green-500/25 px-3 py-1 rounded-sm bg-green-500/5">
              {hero.badge}
            </span>
          </motion.div>

          {/* heading */}
          <motion.h1
            {...fadeUp(0.25)}
            className="font-display font-bold text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-white"
          >
            {hero.headingLine1}
            <br />
            {hero.headingLine2}
            <span className="text-green-400 glow-green-text">
              {hero.headingLine3Highlight}
              <br />
              {hero.headingLine4Highlight}
            </span>
          </motion.h1>

          {/* subtext */}
          <motion.p {...fadeUp(0.4)} className="text-gray-400 text-base leading-relaxed max-w-md">
            {hero.subtext}
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.52)} className="flex flex-wrap gap-3 pt-1">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-display font-bold text-sm rounded transition-all duration-200 glow-green">
              {hero.cta[0].label}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:border-white/40 text-white font-display text-sm rounded transition-all duration-200 hover:bg-white/5">
              <FileText className="w-4 h-4" />
              {hero.cta[1].label}
            </button>
          </motion.div>

          {/* stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-6 pt-4 border-t border-green-500/10"
          >
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 border border-green-500/25 rounded bg-green-500/5">
                  <StatIcon name={stat.icon} />
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-green-400 glow-green-text">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-[11px] leading-tight max-w-[100px]">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right Device ── */}
        <motion.div
          className="relative h-[480px] md:h-[560px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <HeroDevice />
        </motion.div>
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070c07] to-transparent pointer-events-none" />
    </section>
  );
}
