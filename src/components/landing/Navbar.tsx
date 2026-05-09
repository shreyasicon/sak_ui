import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? "bg-[#080810]/92 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-8">

        {/* ── Brand ── */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e87a] shadow-[0_0_8px_rgba(0,232,122,0.7)]" />
          <span className="font-display font-bold text-[15px] text-white tracking-wider">SAK</span>
          <span className="text-white/15 mx-1">|</span>
          <span className="font-display text-[9px] text-[#8888aa] tracking-[0.18em] uppercase hidden sm:block">
            Solana Agent Kernel
          </span>
        </a>

        {/* ── Center nav ── */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#platform"
            className="text-[13px] text-[#8888aa] hover:text-white transition-colors duration-200 font-medium">
            Platform
          </a>
          <a href="/docs"
            className="text-[13px] text-[#8888aa] hover:text-white transition-colors duration-200 font-medium">
            Documentation
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[13px] text-[#8888aa] hover:text-white transition-colors duration-200 font-medium"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
        </nav>

        {/* ── Right CTA ── */}
        <div className="flex items-center gap-3">
          <a
            href="#waitlist-form"
            className="hidden md:flex h-9 items-center px-4 text-[13px] font-medium text-[#00e87a] border border-[#00e87a]/40 rounded-lg hover:bg-[#00e87a] hover:text-black hover:border-[#00e87a] transition-all duration-200"
          >
            Join Waitlist
          </a>

          {/* mobile hamburger */}
          <button
            className="md:hidden text-[#8888aa] hover:text-white p-1 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-[#080810]/98 backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-5 space-y-4">
              {["Platform", "Documentation"].map((label) => (
                <a
                  key={label}
                  href={label === "Documentation" ? "/docs" : "#platform"}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[#8888aa] hover:text-white py-1 text-sm transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#8888aa] hover:text-white py-1 text-sm transition-colors"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="#waitlist-form"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex h-10 items-center justify-center text-sm font-medium text-[#00e87a] border border-[#00e87a]/40 rounded-lg hover:bg-[#00e87a] hover:text-black transition-all"
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
