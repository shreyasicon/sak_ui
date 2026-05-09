import { useRef, useEffect, useState } from "react";
import { useInView, animate } from "framer-motion";

function BigNumber({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setShow(true), delay * 1000);
    return () => clearTimeout(id);
  }, [inView, delay]);

  /* extract numeric part for count-up */
  const match   = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!show || !match) return;
    const num = parseFloat(match[2]!);
    const ctrl = animate(0, num, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        const rounded = Number.isInteger(num) ? Math.round(v) : v.toFixed(1);
        setDisplay(`${match[1]}${rounded}${match[3]}`);
      },
    });
    return () => ctrl.stop();
  }, [show, match]);

  return (
    <div
      ref={ref}
      className={`p-10 border-b border-r border-white/[0.06] last:border-r-0 transition-opacity duration-700 ${show ? "opacity-100" : "opacity-0"}`}
    >
      <div className="font-display font-bold text-6xl text-white mb-4 tabular-nums leading-none">
        {match ? display : value}
      </div>
      <div className="text-[#8888aa] text-[13px] leading-relaxed max-w-[200px]">
        {label}
      </div>
    </div>
  );
}

const NUMBERS = [
  { value: "$1.8B",  label: "Lost to AI agent exploits in 2025", delay: 0    },
  { value: "26",     label: "Malicious LLM routers found April 2026", delay: 0.1  },
  { value: "20/20",  label: "Evil corpus tests passing", delay: 0.2  },
  { value: "$0",     label: "On-chain cost per blocked transaction", delay: 0.3  },
];

export function NumbersSection() {
  return (
    <section className="relative bg-[#080810] overflow-hidden">
      {/* subtle green gradient top-left */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 0% 0%, rgba(0,232,122,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 border-l border-t border-white/[0.06]">
          {NUMBERS.map(({ value, label, delay }) => (
            <BigNumber key={value} value={value} label={label} delay={delay} />
          ))}
        </div>
      </div>
    </section>
  );
}
