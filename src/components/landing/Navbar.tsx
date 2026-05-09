import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
        <a href="/" className="flex items-center gap-3 shrink-0">
          <img src="/final_logo.png" alt="SAK" className="h-8 w-auto" />
        </a>

        {/* ── Center nav ── */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="https://drive.google.com/file/d/1EY4bvIEUv2t7iOxtIWvrj_83kOdjtTRQ/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[#8888aa] hover:text-white transition-colors duration-200 font-medium">
            Demo Video
          </a>
          <a href="/docs"
            className="text-[13px] text-[#8888aa] hover:text-white transition-colors duration-200 font-medium">
            Documentation
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
              <a
                href="https://drive.google.com/file/d/1EY4bvIEUv2t7iOxtIWvrj_83kOdjtTRQ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block text-[#8888aa] hover:text-white py-1 text-sm transition-colors"
              >
                Demo Video
              </a>
              <a
                href="/docs"
                onClick={() => setMobileOpen(false)}
                className="block text-[#8888aa] hover:text-white py-1 text-sm transition-colors"
              >
                Documentation
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
