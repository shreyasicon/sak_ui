import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";
import content from "../../content.json";

const { waitlist: wl } = content;

const AVATARS = [
  { letter: "B", gradient: "from-purple-500 to-blue-600" },
  { letter: "P", gradient: "from-green-500 to-emerald-600" },
  { letter: "S", gradient: "from-orange-500 to-red-600" },
  { letter: "T", gradient: "from-blue-500 to-cyan-600" },
  { letter: "J", gradient: "from-pink-500 to-rose-600" },
];

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [count, setCount] = useState(wl.baseline_count);
  const [displayCount, setDisplayCount] = useState(wl.baseline_count);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(wl.count_endpoint)
      .then(r => r.json())
      .then(data => {
        setCount(data.count);
        const controls = animate(wl.baseline_count, data.count, {
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => setDisplayCount(Math.round(v)),
        });
        return () => controls.stop();
      })
      .catch(() => {
        setCount(wl.baseline_count);
        setDisplayCount(wl.baseline_count);
      });
  }, []);

  const animateCount = (from: number, to: number) => {
    const controls = animate(from, to, {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayCount(Math.round(v)),
    });
    return controls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch(wl.api_endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing_page" }),
      });

      const data = await res.json();

      if (data.duplicate) {
        setStatus("duplicate");
        setMessage(data.message);
        return;
      }

      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setCount(data.count);
        animateCount(displayCount, data.count);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="waitlist-form" className="py-24 text-center border-t border-white/5 bg-[#000000]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto px-6"
      >
        <h2 className="text-4xl font-bold mb-3 font-display">
          {wl.headline}<br />
          <span className="text-[#00e87a]">{wl.headline_green}</span>
        </h2>
        <p className="text-white/40 mb-8 max-w-md mx-auto">
          {wl.sub}
        </p>

        {/* Social proof counter */}
        <div className="flex items-center gap-4 justify-center mb-6">
          <div>
            <span className="font-mono text-3xl font-bold text-[#00e87a] tabular-nums">
              {displayCount}
            </span>
            <span className="font-mono text-sm text-white/40 ml-2">
              teams already waiting
            </span>
          </div>
          <div className="flex items-center">
            {AVATARS.map((av, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full border-2 border-[#080810] bg-gradient-to-br ${av.gradient} flex items-center justify-center font-mono text-xs font-bold text-white ${i === 0 ? "ml-0" : "-ml-2"}`}
              >
                {av.letter}
              </div>
            ))}
            <span className="font-mono text-xs text-white/40 ml-2">
              +{Math.max(0, displayCount - AVATARS.length)}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === "loading" || status === "success"}
              required
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none font-sans focus:border-[#00e87a]/50 transition-colors placeholder:text-white/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success" || !email.includes("@")}
              className="px-6 py-3 bg-[#00e87a] text-[#080810] font-semibold rounded-xl text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap min-w-[140px] flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <span className="w-4 h-4 border-2 border-[#080810]/30 border-t-[#080810] rounded-full animate-spin" />
              ) : status === "success" ? (
                "✓ You're in"
              ) : (
                `${wl.cta} →`
              )}
            </button>
          </div>

          {status === "success" && (
            <p className="text-[#00e87a] text-sm font-mono text-center mt-3">
              {message} We'll reach out when the elizaOS plugin ships.
            </p>
          )}
          {status === "duplicate" && (
            <p className="text-[#00e87a]/60 text-sm font-mono text-center mt-3">
              {message} We'll reach out soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm font-mono text-center mt-3">
              {wl.error_message}
            </p>
          )}
        </form>

        <p className="text-white/20 text-xs font-mono text-center mt-4">
          No spam. Unsubscribe anytime. We will reach out when we are ready!
        </p>
      </motion.div>
    </section>
  );
}
