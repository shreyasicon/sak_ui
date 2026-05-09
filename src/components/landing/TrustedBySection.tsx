import { motion } from "framer-motion";

/* ─── inline SVG logos ─────────────────────────────── */

const SolanaLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 397 312" className={className} fill="currentColor" aria-label="Solana">
    <path d="M64.6 237.9a11 11 0 0 1 7.8-3.2h317.9c4.9 0 7.4 5.9 3.9 9.4l-62.8 62.8a11 11 0 0 1-7.8 3.2H5.7c-4.9 0-7.4-5.9-3.9-9.4l62.8-62.8z"/>
    <path d="M64.6 3.2A11.3 11.3 0 0 1 72.4 0h317.9c4.9 0 7.4 5.9 3.9 9.4L331.4 72.2a11 11 0 0 1-7.8 3.2H5.7c-4.9 0-7.4-5.9-3.9-9.4L64.6 3.2z"/>
    <path d="M331.4 120.1a11 11 0 0 0-7.8-3.2H5.7c-4.9 0-7.4 5.9-3.9 9.4l62.8 62.8a11 11 0 0 0 7.8 3.2h317.9c4.9 0 7.4-5.9 3.9-9.4l-62.8-62.8z"/>
  </svg>
);

const ChainlinkLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 80 92" className={className} fill="currentColor" aria-label="Chainlink">
    <path d="M40 0L20 11.5v23L0 46l20 11.5v23L40 92l20-11.5v-23L80 46 60 34.5v-23L40 0zm0 15l12 7-12 7-12-7 12-7zm-18 18l12 7v14l-12-7V33zm36 0v14l-12 7V40l12-7zm-18 30l12-7 12 7-12 7-12-7z"/>
  </svg>
);

const PolygonLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 38.4 33.5" className={className} fill="currentColor" aria-label="Polygon">
    <path d="M29 10.2a2.1 2.1 0 0 0-2.1 0L21.7 13l-3.4 1.9-5.1 2.8a2.1 2.1 0 0 1-2.1 0l-4-2.3a2.1 2.1 0 0 1-1.1-1.8V9.2a2 2 0 0 1 1.1-1.8L11 5.1a2.1 2.1 0 0 1 2.1 0l4 2.3a2.1 2.1 0 0 1 1.1 1.8v2.8l3.4-2V6.7A2.1 2.1 0 0 0 20.5 5l-6.9-4a2.1 2.1 0 0 0-2.1 0L4.6 5a2.1 2.1 0 0 0-1.1 1.8v8.1a2.1 2.1 0 0 0 1.1 1.8l6.9 4a2.1 2.1 0 0 0 2.1 0l5.1-2.8 3.4-2 5.1-2.8a2.1 2.1 0 0 1 2.1 0l4 2.3a2.1 2.1 0 0 1 1.1 1.8v4.3a2 2 0 0 1-1.1 1.8l-4 2.3a2.1 2.1 0 0 1-2.1 0l-4-2.3a2.1 2.1 0 0 1-1.1-1.8v-2.8l-3.4 2v2.8a2.1 2.1 0 0 0 1.1 1.8l6.9 4a2.1 2.1 0 0 0 2.1 0l6.9-4A2.1 2.1 0 0 0 38.4 24v-8.1a2.1 2.1 0 0 0-1.1-1.8l-6.9-4z"/>
  </svg>
);

const AptosLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="currentColor" aria-label="Aptos">
    <path fillRule="evenodd" clipRule="evenodd" d="M85.8 36.7a8 8 0 0 0-6.1-2.7H40.3a8 8 0 0 0-6.1 2.7L6 70.9A8 8 0 0 0 6 81l28.2 8.3a8 8 0 0 0 6.1-2.7l51.4-60a8 8 0 0 0-5.9-10.6zM48 66.8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm24 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
    <path d="M89.7 50.4 66 78.7a8 8 0 0 1-6.1 2.7H26.7l-8 9.3a8 8 0 0 0 6.1 13.3h46.5a8 8 0 0 0 6.1-2.7L114 63a8 8 0 0 0-6.1-13.3h-6.1a8 8 0 0 0-6.1 2.7z"/>
  </svg>
);

const AvalancheLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 254 254" className={className} fill="currentColor" aria-label="Avalanche">
    <path fillRule="evenodd" clipRule="evenodd" d="M127 0C57 0 0 57 0 127s57 127 127 127 127-57 127-127S197 0 127 0zm-13.5 161.4H79.3c-5.8 0-8.7-2.9-5.8-8.7l51.6-89.4c2.9-5.8 8.7-5.8 11.6 0l14.5 25.4a5.8 5.8 0 0 1 0 5.8l-37.1 66.9zm75.2 0h-36.2c-5.8 0-8.7-2.9-5.8-8.7l17.4-30.4a5.8 5.8 0 0 1 10.1 0l20.3 33.3c2.9 4.3.6 7.2-5.8 7.2z"/>
  </svg>
);

const EYLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 60" className={className} fill="currentColor" aria-label="EY">
    <text x="0" y="50" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="60" letterSpacing="-2">EY</text>
  </svg>
);

const McKinseyLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 40" className={className} fill="currentColor" aria-label="McKinsey">
    <text x="0" y="32" fontFamily="Georgia, serif" fontWeight="400" fontSize="30" letterSpacing="0.5">McKinsey</text>
  </svg>
);

const TejasLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 40" className={className} fill="currentColor" aria-label="Tejas Networks">
    <rect x="0" y="4" width="12" height="32" rx="2"/>
    <rect x="0" y="4" width="34" height="10" rx="2"/>
    <circle cx="60" cy="20" r="5"/>
    <circle cx="80" cy="10" r="4"/>
    <circle cx="80" cy="30" r="4"/>
    <circle cx="100" cy="20" r="4"/>
    <circle cx="115" cy="8" r="3"/>
    <circle cx="115" cy="32" r="3"/>
    <line x1="65" y1="20" x2="76" y2="13" stroke="currentColor" strokeWidth="2"/>
    <line x1="65" y1="20" x2="76" y2="27" stroke="currentColor" strokeWidth="2"/>
    <line x1="84" y1="13" x2="96" y2="20" stroke="currentColor" strokeWidth="2"/>
    <line x1="84" y1="27" x2="96" y2="20" stroke="currentColor" strokeWidth="2"/>
    <line x1="104" y1="20" x2="112" y2="11" stroke="currentColor" strokeWidth="2"/>
    <line x1="104" y1="20" x2="112" y2="29" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

/* ─── logo data ─────────────────────────────────────── */
const logos = [
  { name: "Solana",         Icon: SolanaLogo,    width: "w-24" },
  { name: "Chainlink",      Icon: ChainlinkLogo, width: "w-8"  },
  { name: "Polygon",        Icon: PolygonLogo,   width: "w-8"  },
  { name: "Aptos",          Icon: AptosLogo,     width: "w-9"  },
  { name: "Avalanche",      Icon: AvalancheLogo, width: "w-9"  },
  { name: "Tejas Networks", Icon: TejasLogo,     width: "w-24" },
  { name: "EY",             Icon: EYLogo,        width: "w-14" },
  { name: "McKinsey",       Icon: McKinseyLogo,  width: "w-28" },
];

const doubled = [...logos, ...logos];

export function TrustedBySection() {
  return (
    <section className="relative py-16 border-y border-green-500/10 bg-[#060a06] overflow-hidden">

      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-6"
      >
        <p className="font-display text-[10px] tracking-[0.35em] text-green-500/60 mb-3 uppercase">
          Trusted By Builders &amp; Enterprises
        </p>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          Ecosystem &amp; team background spanning top-tier blockchain protocols and global consulting firms.
        </p>
      </motion.div>

      {/* marquee */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#060a06] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#060a06] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee">
          {doubled.map(({ name, Icon, width }, i) => (
            <div
              key={i}
              className="group flex flex-col items-center justify-center gap-3 px-12 min-w-max"
            >
              {/* logo icon */}
              <div className="h-10 flex items-center justify-center">
                <Icon
                  className={`${width} h-full text-gray-500 group-hover:text-green-400 transition-colors duration-300 opacity-70 group-hover:opacity-100`}
                />
              </div>
              {/* company name */}
              <span className="font-display text-[10px] tracking-[0.2em] text-gray-600 group-hover:text-green-500/80 transition-colors duration-300 uppercase whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom rule */}
      <div className="mt-12 mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
    </section>
  );
}
