import { motion } from "framer-motion";
import { Shield, Zap, Package, Activity, Settings, Globe } from "lucide-react";
import content from "../../content.json";

const iconMap: Record<string, React.ReactNode> = {
  shield:  <Shield  className="w-6 h-6 text-green-400" />,
  zap:     <Zap     className="w-6 h-6 text-green-400" />,
  package: <Package className="w-6 h-6 text-green-400" />,
};

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0  },
};

export function PillarsSection() {
  const { pillars } = content;

  return (
    <section className="relative py-24 bg-[#060a06] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,197,94,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-1 h-5 bg-green-400 rounded-full" />
          <span className="font-display text-[10px] tracking-[0.25em] text-green-400/80">
            {pillars.sectionLabel}
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">

          {/* ── Left: pillar cards ── */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.15 }}
          >
            {pillars.items.map((pillar) => (
              <motion.div
                key={pillar.name}
                variants={cardVariant}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group p-6 border border-green-500/12 rounded-xl bg-[#080e08] card-hover-glow cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 border border-green-500/20 rounded-lg bg-green-500/5 group-hover:bg-green-500/10 transition-colors">
                    {iconMap[pillar.icon]}
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-bold text-sm text-white tracking-wide mb-0.5">
                      {pillar.name}
                    </div>
                    <div className="text-green-400/70 text-xs font-display mb-2">
                      {pillar.tagline}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Right: dashboard mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            {/* browser chrome */}
            <div className="border border-green-500/20 rounded-2xl overflow-hidden bg-[#060e06] shadow-[0_0_60px_rgba(34,197,94,0.06)]">

              {/* title bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-green-500/10 bg-[#050c05]">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="font-display text-[10px] text-green-600/50 mx-auto">SAK</span>
                <span className="font-display text-[9px] text-gray-600">Demo  Specs  ●</span>
              </div>

              <div className="flex h-[400px]">
                {/* sidebar */}
                <div className="w-28 border-r border-green-500/8 flex flex-col pt-4 px-3 gap-3 bg-[#050c05]">
                  {["Overview", "Threats", "Simulations", "Agents", "Settings"].map((item, i) => (
                    <div
                      key={item}
                      className={`font-display text-[9px] px-2 py-1.5 rounded cursor-pointer transition-colors ${
                        i === 0
                          ? "bg-green-500/15 text-green-400 border-l-2 border-green-400"
                          : "text-gray-600 hover:text-gray-400"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* main content */}
                <div className="flex-1 p-4 overflow-hidden">
                  <div className="mb-3">
                    <div className="font-display text-xs text-white/80">{pillars.dashboard.title}</div>
                    <div className="font-display text-[8px] text-green-500/60 mt-1">{pillars.dashboard.subtitle}</div>
                  </div>

                  {/* stat cards row */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {pillars.dashboard.stats.map((s) => (
                      <div key={s.label} className="bg-[#080f08] border border-green-500/10 rounded-lg p-2.5">
                        <div className="font-display text-[7px] text-gray-500 mb-1">{s.label}</div>
                        <div className="font-display font-bold text-sm text-green-400">{s.value}</div>
                        <div className="font-display text-[7px] text-gray-600">{s.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* mini chart */}
                  <div className="bg-[#080f08] border border-green-500/10 rounded-lg p-3 mb-3">
                    <div className="font-display text-[8px] text-gray-500 mb-2">Threats Over Time</div>
                    <svg viewBox="0 0 220 50" className="w-full h-12">
                      <defs>
                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#22c55e" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity="0"   />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d="M0,40 C30,38 50,20 70,18 C90,16 110,35 130,30 C150,25 170,10 190,12 C200,13 210,18 220,15"
                        fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, delay: 0.5 }}
                      />
                      <motion.path
                        d="M0,40 C30,38 50,20 70,18 C90,16 110,35 130,30 C150,25 170,10 190,12 C200,13 210,18 220,15 L220,50 L0,50 Z"
                        fill="url(#chartFill)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, delay: 0.8 }}
                      />
                    </svg>
                  </div>

                  {/* recent sessions */}
                  <div className="bg-[#080f08] border border-green-500/10 rounded-lg p-3">
                    <div className="font-display text-[8px] text-gray-500 mb-2">Recent Sessions</div>
                    <div className="space-y-2">
                      {pillars.dashboard.recentSessions.map((s) => (
                        <div key={s.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                              <span className="text-[5px] text-green-400 font-display">{s.name[0]}</span>
                            </div>
                            <span className="font-display text-[8px] text-gray-400">{s.name}</span>
                          </div>
                          <span className="font-display text-[7px] text-gray-600">{s.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* decorative glow under card */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-green-500/10 blur-2xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
