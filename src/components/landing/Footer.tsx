import { useState } from "react";
import { Twitter, Github, MessageCircle, ArrowRight } from "lucide-react";
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
  const { footer, waitlist: wl } = content;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch(wl.api_endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json();
      setStatus(data.duplicate || data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#000000] pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1.6fr] gap-10 mb-14">

          {/* ── Brand ── */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <img src="/final_logo_full_name.png" alt="SAK" className="h-8 w-auto mb-2" />
              <div className="font-display text-[9px] text-[#8888aa] tracking-[0.18em]">
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
              onSubmit={handleSubmit}
              className="flex items-center border border-white/[0.08] rounded-lg overflow-hidden bg-white/[0.02] focus-within:border-white/[0.15] transition-colors"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === "loading" || status === "success"}
                className="flex-1 bg-transparent px-3 py-2.5 text-[12px] text-white/80 placeholder:text-[#8888aa] outline-none font-mono disabled:opacity-40"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-3 py-2.5 text-[#8888aa] hover:text-white hover:bg-white/[0.05] transition-colors disabled:opacity-40"
              >
                {status === "loading" ? (
                  <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : status === "success" ? (
                  <span className="text-green-400">✓</span>
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </button>
            </form>
            {status === "success" && (
              <p className="text-green-400/60 text-[11px] font-mono">You&apos;re on the list!</p>
            )}
            {status === "error" && (
              <p className="text-red-400/60 text-[11px] font-mono">Something went wrong.</p>
            )}
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
