import { useEffect, useState } from "react";

const ENTRIES = [
  { type: "BLOCK", hash: "6f2a8b3c...1d4e", rule: "hidden_delegate_authority", ruleId: "RULE-07", ms: "41ms" },
  { type: "ALLOW", hash: "9b3e7d2f...4a1c", rule: "clean_jupiter_swap",         ruleId: "PASS",    ms: "38ms" },
  { type: "BLOCK", hash: "2d4f9c1a...8e3b", rule: "router_spoof_detected",       ruleId: "RULE-12", ms: "43ms" },
  { type: "ALLOW", hash: "4a1b6e8d...2f3c", rule: "approved_token_transfer",     ruleId: "PASS",    ms: "39ms" },
  { type: "BLOCK", hash: "7c2e4a1f...5b9d", rule: "unauthorized_program_invoke", ruleId: "RULE-03", ms: "45ms" },
  { type: "ALLOW", hash: "1e3a8c4b...9f2d", rule: "verified_swap_route",         ruleId: "PASS",    ms: "37ms" },
];

const TIMES = ["2s ago", "8s ago", "14s ago", "21s ago", "35s ago", "42s ago"];

export function GuardianDashboard({ compact = false }: { compact?: boolean }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  const pulse = tick % 2 === 0;

  return (
    <div className="bg-[#08080f] rounded-xl overflow-hidden border border-white/[0.07] font-mono text-xs select-none">
      {/* ── header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] bg-[#090912]">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-[13px] tracking-wide">SAK Guardian</span>
          <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${pulse ? "bg-[#00e87a]/10 border-[#00e87a]/30" : "bg-[#00e87a]/5 border-[#00e87a]/15"} transition-all duration-700`}>
            <span className={`w-1.5 h-1.5 rounded-full ${pulse ? "bg-[#00e87a]" : "bg-[#00e87a]/60"} transition-colors duration-700`} />
            <span className="text-[#00e87a] text-[9px] tracking-[0.15em]">ACTIVE</span>
          </span>
        </div>
        <span className="text-[#8888aa] text-[10px]">v0.4.1 · Mainnet</span>
      </div>

      {/* ── stats row ── */}
      <div className="grid grid-cols-4 border-b border-white/[0.05]">
        {[
          { val: "20/20", label: "PATTERNS" },
          { val: "43ms",  label: "AVG RT"  },
          { val: "$0.00", label: "COST"    },
          { val: "204",   label: "SESSIONS"},
        ].map(({ val, label }, i) => (
          <div key={label} className={`px-4 py-3 ${i < 3 ? "border-r border-white/[0.05]" : ""}`}>
            <div className="text-white font-bold text-base leading-none">{val}</div>
            <div className="text-[#8888aa] text-[9px] tracking-[0.12em] mt-1.5">{label}</div>
          </div>
        ))}
      </div>

      {/* ── log header ── */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#090912]/60 border-b border-white/[0.04]">
        <span className="text-[#8888aa] text-[9px] tracking-[0.15em]">TRANSACTION LOG</span>
        <span className={`text-[9px] transition-colors duration-700 ${pulse ? "text-[#00e87a]" : "text-[#00e87a]/40"}`}>● LIVE</span>
      </div>

      {/* ── entries ── */}
      <div className="divide-y divide-white/[0.03]">
        {ENTRIES.slice(0, compact ? 4 : 6).map((e, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.018] transition-colors duration-150 group">
            <span className={`text-[9px] font-bold tracking-[0.12em] w-9 shrink-0 ${e.type === "BLOCK" ? "text-red-400" : "text-[#00e87a]"}`}>
              {e.type}
            </span>
            <span className="text-[#555577] text-[10px] shrink-0 group-hover:text-[#8888aa] transition-colors">{e.hash}</span>
            <span className="flex-1 text-[#aaaacc] text-[10px] truncate">{e.rule}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 ${e.ruleId === "PASS" ? "text-[#00e87a]/60 bg-[#00e87a]/5" : "text-red-400/60 bg-red-400/5"}`}>
              {e.ruleId}
            </span>
            <span className="text-[#555577] text-[9px] shrink-0 w-11 text-right">{e.ms}</span>
            <span className="text-[#444466] text-[9px] shrink-0 w-14 text-right">{TIMES[i]}</span>
          </div>
        ))}
      </div>

      {/* ── footer ── */}
      {!compact && (
        <div className="px-4 py-2.5 border-t border-white/[0.04] bg-[#090912]/40 flex items-center justify-between">
          <span className="text-[#555577] text-[9px]">
            Blocked: <span className="text-red-400/80">20</span>
            {" · "}Allowed: <span className="text-[#00e87a]/80">184</span>
            {" · "}Cost saved: <span className="text-[#00e87a]/80">100%</span>
          </span>
          <span className="text-[#444466] text-[9px]">LiteSVM · Geyser Push</span>
        </div>
      )}
    </div>
  );
}
