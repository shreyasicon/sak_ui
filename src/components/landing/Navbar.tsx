import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import content from "../../content.json";

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { navbar } = content;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,  opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070c07]/85 backdrop-blur-xl border-b border-green-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Brand ── */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-xl tracking-wide text-green-400 glow-green-text">
              {navbar.brand.name}
            </span>
            <span className="font-display text-[7px] text-green-600/80 tracking-[0.22em] mt-0.5">
              {navbar.brand.tagline}
            </span>
          </div>
        </div>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-7">
          {navbar.links.map((link) => (
            <button
              key={link.label}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-400 transition-colors duration-200 font-medium cursor-pointer"
            >
              {link.label}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
          ))}
        </div>

        {/* ── Desktop Actions ── */}
        <div className="hidden md:flex items-center gap-5">
          <button className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
            {navbar.actions.login}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-display font-bold text-green-400 border border-green-500/60 rounded hover:bg-green-500/10 hover:border-green-400 transition-all duration-200 glow-green-sm">
            {navbar.actions.launch}
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden text-gray-400 hover:text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#070c07]/95 backdrop-blur-xl border-t border-green-500/10 overflow-hidden"
          >
            <div className="px-6 py-5 space-y-4">
              {navbar.links.map((link) => (
                <div
                  key={link.label}
                  className="text-gray-400 hover:text-green-400 py-1.5 cursor-pointer transition-colors text-sm font-medium"
                >
                  {link.label}
                </div>
              ))}
              <div className="pt-3 border-t border-green-500/10 flex flex-col gap-3">
                <button className="text-sm text-gray-400 text-left">{navbar.actions.login}</button>
                <button className="px-4 py-2 text-sm font-display font-bold text-green-400 border border-green-500/60 rounded hover:bg-green-500/10 transition-all">
                  {navbar.actions.launch}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
