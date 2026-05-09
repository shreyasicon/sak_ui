import { useState } from "react";
import { Twitter, Github, MessageCircle, Linkedin, ArrowRight } from "lucide-react";
import content from "../../content.json";

const PRODUCT_LINKS  = [
  { label: "Platform",       href: "#platform"  },
  { label: "Guardian",       href: "#pillars"   },
  { label: "Reflex Engine",  href: "#pillars"   },
  { label: "ZK State",       href: "#pillars"   },
];
const RESOURCE_LINKS = [
  { label: "Documentation",  href: "/docs"  },
  { label: "GitHub",         href: "#"      },
  { label: "Whitepaper",     href: "#"      },
];
const COMPANY_LINKS  = [
  { label: "About",    href: "#" },
  { label: "Careers",  href: "#" },
  { label: "Contact",  href: "#" },
];
const LEGAL_LINKS    = [
  { label: "Privacy",  href: "#" },
  { label: "Terms",    href: "#" },
];

const SOCIAL = [
  { icon: <Github      className="w-4 h-4" />, href: "#", label: "GitHub"   },
  { icon: <Twitter     className="w-4 h-4" />, href: "#", label: "Twitter"  },
  { icon: <MessageCircle className="w-4 h-4" />, href: "#", label: "Discord" },
];

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="font-display text-[9px] tracking-[0.22em] text-[#8888aa] mb-4 uppercase">{title}</div>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className="text-[13px] text-[#8888aa] hover:text-white transition-colors duration-200">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { footer } = content;
  const [email, setEmail] = useState("");

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#000000] pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1.6fr] gap-10 mb-14">

          {/* ── Brand ── */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e87a]" />
                <span className="font-display font-bold text-[15px] text-white tracking-wide">SAK</span>
              </div>
              <div className="font-display text-[9px] text-[#8888aa] tracking-[0.18em] ml-3.5">
                {footer.brand.tagline}
              </div>
            </div>
            <p className="text-[#8888aa] text-[13px] leading-relaxed max-w-[200px]">
              {footer.brand.description}
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {SOCIAL.map(({ icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 border border-white/[0.08] rounded-lg flex items-center justify-center text-[#8888aa] hover:text-white hover:border-white/20 transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          <LinkColumn title="Product"   links={PRODUCT_LINKS}  />
          <LinkColumn title="Resources" links={RESOURCE_LINKS} />
          <LinkColumn title="Company"   links={COMPANY_LINKS}  />
          <LinkColumn title="Legal"     links={LEGAL_LINKS}    />

          {/* ── Newsletter ── */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="font-display text-[9px] tracking-[0.22em] text-[#8888aa] uppercase">Newsletter</div>
            <p className="text-[#8888aa] text-[13px] leading-relaxed">
              Stay updated on AI agent security.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center border border-white/[0.08] rounded-lg overflow-hidden bg-white/[0.02] focus-within:border-white/[0.15] transition-colors"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-3 py-2.5 text-[12px] text-white/80 placeholder:text-[#8888aa] outline-none font-mono"
              />
              <button
                type="submit"
                className="px-3 py-2.5 text-[#8888aa] hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* ── bottom bar ── */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-[#8888aa] text-[12px] font-display">
            © 2026 SAK — Solana Agent Kernel. MIT License.
          </span>
          <span className="text-[#8888aa] text-[11px]">
            Built on <span className="text-[#00e87a]/70">Solana</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
