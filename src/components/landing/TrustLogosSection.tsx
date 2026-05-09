const LOGOS = [
  "Solana", "Chainlink", "Polygon", "Aptos",
  "Avalanche", "EY", "McKinsey", "Tejas Networks",
];

export function TrustLogosSection() {
  return (
    <section className="py-10 border-y border-white/5 bg-[#080810]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-8 font-mono">
          Ecosystem & Team Background
        </p>
        <div className="overflow-hidden">
          <div className="flex animate-marquee" style={{ width: "max-content" }}>
            {[...LOGOS, ...LOGOS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-white/40 text-sm font-medium mx-10 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
