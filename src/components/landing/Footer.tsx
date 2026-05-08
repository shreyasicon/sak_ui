import { useState } from "react";
import { motion } from "framer-motion";
import { Twitter, Linkedin, MessageCircle, Github, ArrowRight } from "lucide-react";
import content from "../../content.json";

const socialIconMap = (platform: string) => {
  const cls = "w-4 h-4";
  if (platform === "twitter")  return <Twitter      className={cls} />;
  if (platform === "discord")  return <MessageCircle className={cls} />;
  if (platform === "github")   return <Github        className={cls} />;
  if (platform === "linkedin") return <Linkedin      className={cls} />;
  return null;
};

export function Footer() {
  const { footer } = content;
  const [email, setEmail] = useState("");

  return (
    <footer className="relative border-t border-green-500/10 bg-[#050a05] pt-16 pb-8 overflow-hidden">

      {/* top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.5fr] gap-10 mb-14"
        >

          {/* ── Brand col ── */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <div className="font-display font-bold text-xl text-green-400 glow-green-text">{footer.brand.name}</div>
              <div className="font-display text-[7px] tracking-[0.25em] text-green-600/70 mt-0.5">{footer.brand.tagline}</div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
              {footer.brand.description}
            </p>
            <div className="flex items-center gap-3 pt-1">
              {footer.brand.social.map(({ platform, href }) => (
                <a
                  key={platform}
                  href={href}
                  className="w-8 h-8 border border-green-500/20 rounded-lg flex items-center justify-center text-gray-500 hover:text-green-400 hover:border-green-500/40 transition-all"
                  aria-label={platform}
                >
                  {socialIconMap(platform)}
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {footer.columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <div className="font-display text-[9px] tracking-[0.22em] text-gray-500">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-green-400 text-xs transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Newsletter ── */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="font-display text-[9px] tracking-[0.22em] text-gray-500">
              {footer.newsletter.title}
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              {footer.newsletter.description}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-0 border border-green-500/20 rounded-lg overflow-hidden bg-[#070c07] focus-within:border-green-500/40 transition-colors"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={footer.newsletter.placeholder}
                className="flex-1 bg-transparent px-3 py-2 text-xs text-gray-300 placeholder:text-gray-600 outline-none font-display"
              />
              <button
                type="submit"
                className="px-3 py-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 transition-colors font-display font-bold text-sm"
              >
                {footer.newsletter.buttonLabel}
              </button>
            </form>
          </div>
        </motion.div>

        {/* ── bottom bar ── */}
        <div className="border-t border-green-500/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-gray-600 text-[11px] font-display">{footer.copyright}</span>
          <span className="text-gray-700 text-[10px]">
            Built on <span className="text-green-700">Solana</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
