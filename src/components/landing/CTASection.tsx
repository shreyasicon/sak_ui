import { useState } from "react";
import { motion } from "framer-motion";

export function CTASection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    window.open(`https://tally.so/r/YOUR_FORM_ID?email=${encodeURIComponent(email)}`, "_blank");
  };

  return (
    <section className="py-24 text-center border-t border-white/5 bg-[#000000]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto px-6"
      >
        <h2 className="text-4xl font-bold mb-3 font-display">
          Build AI Systems That<br/>
          <span className="text-[#00e87a]">Can't Be Used Against You.</span>
        </h2>
        <p className="text-white/40 mb-8 max-w-md mx-auto">
          Join the waitlist. Get early access to SAK Guardian and the elizaOS plugin.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00e87a]/50 transition-colors placeholder:text-white/20"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#00e87a] text-[#080810] font-semibold rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Join Waitlist →
          </button>
        </form>

        <p className="text-white/20 text-xs mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
