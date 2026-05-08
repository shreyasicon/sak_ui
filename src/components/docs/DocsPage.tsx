import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Coins,
  Copy,
  ExternalLink,
  FileCode2,
  Github,
  Layers,
  Menu,
  Network,
  Package,
  Shield,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import docs from "../../../dev-asset/sak-docs.json";
import "../../index.css";

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

type PageId =
  | "overview"
  | "problem"
  | "stack"
  | "pillars"
  | "api"
  | "rules"
  | "evil-corpus"
  | "simulation-errors"
  | "demo"
  | "integration"
  | "workspace"
  | "status"
  | "deployment"
  | "faq"
  | "team"
  | "hackathon"
  | "raw-json";

const docData = docs as unknown as JsonObject & {
  meta: Record<string, string>;
  one_liner: string;
  problem: any;
  stack_position: any;
  pillars: any[];
  api: any;
  rules: any[];
  rules_yaml_full: any;
  evil_corpus: any;
  simulation_errors: any;
  demo: any;
  integration: any;
  workspace: any;
  status: any;
  deployment: any;
  faq: any[];
  team: any[];
  hackathon: any;
};

const pages: Array<{ id: PageId; label: string; eyebrow: string; icon: ReactNode }> = [
  { id: "overview", eyebrow: "Start here", label: "Overview", icon: <BookOpen className="w-4 h-4" /> },
  { id: "problem", eyebrow: "Why SAK exists", label: "Problem", icon: <Shield className="w-4 h-4" /> },
  { id: "stack", eyebrow: "Architecture", label: "Stack Position", icon: <Network className="w-4 h-4" /> },
  { id: "pillars", eyebrow: "Kernel modules", label: "Pillars", icon: <Layers className="w-4 h-4" /> },
  { id: "api", eyebrow: "Developer reference", label: "API", icon: <FileCode2 className="w-4 h-4" /> },
  { id: "rules", eyebrow: "Guardian policy", label: "Rules", icon: <Terminal className="w-4 h-4" /> },
  { id: "evil-corpus", eyebrow: "Tests", label: "Evil Corpus", icon: <Zap className="w-4 h-4" /> },
  { id: "simulation-errors", eyebrow: "Failures", label: "Simulation Errors", icon: <X className="w-4 h-4" /> },
  { id: "demo", eyebrow: "Live preview", label: "Demo", icon: <Package className="w-4 h-4" /> },
  { id: "integration", eyebrow: "Quick start", label: "Integration", icon: <ArrowRight className="w-4 h-4" /> },
  { id: "workspace", eyebrow: "Repo", label: "Workspace", icon: <Github className="w-4 h-4" /> },
  { id: "status", eyebrow: "Project health", label: "Status", icon: <CheckCircle2 className="w-4 h-4" /> },
  { id: "deployment", eyebrow: "Ops", label: "Deployment", icon: <Network className="w-4 h-4" /> },
  { id: "faq", eyebrow: "Questions", label: "FAQ", icon: <BookOpen className="w-4 h-4" /> },
  { id: "team", eyebrow: "Builders", label: "Team", icon: <Brain className="w-4 h-4" /> },
  { id: "hackathon", eyebrow: "Submission", label: "Hackathon", icon: <Zap className="w-4 h-4" /> },
  { id: "raw-json", eyebrow: "Source", label: "Raw JSON", icon: <FileCode2 className="w-4 h-4" /> },
];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function titleCase(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function IconByName({ name, className = "w-5 h-5 text-green-400" }: { name?: string; className?: string }) {
  if (name === "zap") return <Zap className={className} />;
  if (name === "layers") return <Layers className={className} />;
  if (name === "brain") return <Brain className={className} />;
  if (name === "clock") return <Clock className={className} />;
  if (name === "coins") return <Coins className={className} />;
  return <Shield className={className} />;
}

function Pill({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "gray" | "red" | "yellow" }) {
  const tones = {
    green: "border-green-500/20 bg-green-500/8 text-green-300",
    gray: "border-white/10 bg-white/[0.035] text-gray-300",
    red: "border-red-500/20 bg-red-500/8 text-red-300",
    yellow: "border-yellow-500/20 bg-yellow-500/8 text-yellow-300",
  };

  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-display text-[10px] ${tones[tone]}`}>{children}</span>;
}

function CodeBlock({ code, language = "code" }: { code: string; language?: string }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // clipboard can be unavailable in restricted browser contexts
    }
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-green-500/15 bg-[#05070b]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-green-500/10 bg-black/25">
        <span className="font-display text-[10px] tracking-[0.2em] text-green-500/70 uppercase">{language}</span>
        <button onClick={copy} className="text-gray-500 hover:text-green-400 transition-colors" aria-label="Copy code">
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs md:text-sm leading-relaxed text-green-100/80 font-display">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FlexibleJson({ value, depth = 0 }: { value: unknown; depth?: number }) {
  if (value === null || value === undefined) return <span className="text-gray-600">null</span>;

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    if (typeof value === "string" && value.includes("\n")) return <CodeBlock code={value} />;
    if (typeof value === "string" && value.startsWith("http")) {
      return (
        <a href={value} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 break-all">
          {value} <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      );
    }
    return <span className="text-gray-300 break-words">{String(value)}</span>;
  }

  if (Array.isArray(value)) {
    const primitiveArray = value.every((item) => ["string", "number", "boolean"].includes(typeof item));

    if (primitiveArray) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <Pill key={index} tone="gray">{String(item)}</Pill>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {value.map((item, index) => (
          <div key={index} className="rounded-xl border border-green-500/10 bg-black/15 p-4">
            <FlexibleJson value={item} depth={depth + 1} />
          </div>
        ))}
      </div>
    );
  }

  if (isObject(value)) {
    return (
      <div className="space-y-4">
        {Object.entries(value).map(([key, child]) => (
          <div key={key} className={depth > 1 ? "" : "rounded-xl border border-green-500/10 bg-white/[0.02] p-4"}>
            <div className="font-display text-[10px] tracking-[0.18em] text-green-500/70 uppercase mb-2">{titleCase(key)}</div>
            <FlexibleJson value={child} depth={depth + 1} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

function PageShell({ page, children }: { page: (typeof pages)[number]; children: ReactNode }) {
  return (
    <motion.article
      key={page.id}
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-green-500/15 bg-[#080810]/82 backdrop-blur-sm p-5 md:p-8 glow-green-sm min-h-[calc(100vh-9rem)]"
    >
      <div className="mb-8 border-b border-green-500/10 pb-6">
        <div className="font-display text-[10px] tracking-[0.3em] uppercase text-green-400/70 mb-3">{page.eyebrow}</div>
        <h1 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">{page.label}</h1>
      </div>
      {children}
    </motion.article>
  );
}

function OverviewPage() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-green-500/15 bg-[#05070b] p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(0,232,122,0.14)_0%,transparent_45%)] pointer-events-none" />
        <div className="relative space-y-6 max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <Pill>{docData.meta.status}</Pill>
            <Pill tone="gray">v{docData.meta.version}</Pill>
            <Pill tone="gray">Updated {docData.meta.last_updated}</Pill>
          </div>
          <div>
            <div className="font-display text-[10px] tracking-[0.3em] text-green-400/70 uppercase mb-3">{docData.meta.product}</div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight">{docData.meta.tagline}</h2>
          </div>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">{docData.one_liner}</p>
          <div className="flex flex-wrap gap-3">
            <a href={docData.meta.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 font-display font-bold text-sm text-black hover:bg-green-400 transition-colors glow-green">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href={docData.meta.demo_ui} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-display text-sm text-white hover:border-green-500/40 hover:bg-green-500/8 transition-colors">
              Demo UI <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <FlexibleJson value={docData.meta} />
    </div>
  );
}

function ProblemPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">{docData.problem.headline}</h2>
        <p className="text-gray-400 leading-relaxed">{docData.problem.sub}</p>
      </div>

      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.045] p-5">
        <div className="flex items-start gap-4">
          <div className="rounded-xl border border-red-500/20 bg-red-500/8 p-2"><Shield className="w-5 h-5 text-red-300" /></div>
          <div>
            <div className="font-display font-bold text-white mb-1">{docData.problem.real_incident.title}</div>
            <p className="text-gray-400 text-sm leading-relaxed">{docData.problem.real_incident.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill tone="red">{docData.problem.real_incident.amount}</Pill>
              <Pill tone="gray">{docData.problem.real_incident.date}</Pill>
              <Pill tone="gray">{docData.problem.real_incident.source}</Pill>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {docData.problem.stats.map((stat: any) => (
          <div key={stat.label} className="rounded-xl border border-green-500/10 bg-white/[0.025] p-4">
            <div className="font-display font-bold text-2xl text-green-400 glow-green-text">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1 leading-relaxed">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {docData.problem.failures.map((failure: any) => (
          <div key={failure.name} className="rounded-xl border border-green-500/10 bg-[#05070b] p-5 card-hover-glow">
            <div className="flex items-center gap-3 mb-3">
              <IconByName name={failure.icon} />
              <h3 className="font-display font-bold text-white text-sm">{failure.name}</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{failure.description}</p>
            <ul className="space-y-2">
              {failure.examples.map((example: string) => (
                <li key={example} className="flex gap-2 text-xs text-gray-400"><span className="text-green-400">•</span>{example}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackPage() {
  return (
    <div className="space-y-8">
      <h2 className="font-display font-bold text-2xl md:text-3xl text-white">{docData.stack_position.headline}</h2>
      <div className="grid md:grid-cols-4 gap-3">
        {docData.stack_position.layers.map((layer: any, index: number) => (
          <div key={layer.name} className={`relative rounded-xl border p-5 text-center ${layer.highlight ? "border-green-400/70 bg-green-500/8 glow-green-sm" : "border-white/10 bg-white/[0.025]"}`}>
            <div className="font-display font-bold text-white text-sm">{layer.name}</div>
            <div className="text-xs text-gray-500 mt-1">{layer.sublabel}</div>
            <div className={`font-display text-[9px] mt-3 ${layer.highlight ? "text-green-400" : "text-gray-600"}`}>{layer.note}</div>
            {index < docData.stack_position.layers.length - 1 && <ArrowRight className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2 w-4 h-4 text-green-500/40" />}
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {docData.stack_position.data_flow.map((flow: string) => (
          <div key={flow} className="flex items-center gap-3 rounded-xl border border-green-500/10 bg-black/15 p-4 text-sm text-gray-300">
            <Network className="w-4 h-4 text-green-400 shrink-0" />
            {flow}
          </div>
        ))}
      </div>
    </div>
  );
}

function PillarsPage() {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {docData.pillars.map((pillar) => (
        <div key={pillar.id} className="rounded-xl border border-green-500/10 bg-[#05070b] p-5 card-hover-glow">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-xl border border-green-500/20 bg-green-500/8 p-2"><IconByName name={pillar.icon} /></div>
            <Pill tone={pillar.status === "production" ? "green" : "yellow"}>{pillar.status}</Pill>
          </div>
          <div className="font-display text-[10px] text-green-500/70 mb-1">{pillar.crate}</div>
          <h3 className="font-display font-bold text-xl text-white mb-1">{pillar.name}</h3>
          <div className="font-display text-xs text-green-400/80 mb-3">{pillar.tagline}</div>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">{pillar.description}</p>
          {pillar.the_guarantee && <blockquote className="border-l-2 border-green-400 pl-3 text-sm text-green-200/80 mb-4">{pillar.the_guarantee}</blockquote>}
          <div className="space-y-4">
            <div>
              <div className="font-display text-[10px] text-gray-500 uppercase mb-2">How it works</div>
              <ul className="space-y-2">
                {pillar.how_it_works.map((step: string) => <li key={step} className="text-xs text-gray-400 flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />{step}</li>)}
              </ul>
            </div>
            <FlexibleJson value={pillar.metrics} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ApiPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="font-display text-[10px] text-gray-500 uppercase mb-3">Crates</div>
        <FlexibleJson value={docData.api.crates} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-green-500/10 bg-[#05070b] p-5"><FlexibleJson value={docData.api.guardian} /></div>
        <div className="rounded-xl border border-green-500/10 bg-[#05070b] p-5"><FlexibleJson value={docData.api.kernel} /></div>
      </div>
      <div className="space-y-4">
        {docData.api.types.map((type: any) => (
          <div key={type.name} className="rounded-xl border border-green-500/10 bg-[#05070b] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h3 className="font-display font-bold text-white">{type.name}</h3>
              <div className="flex gap-2"><Pill tone="gray">{type.kind}</Pill><Pill>{type.crate}</Pill></div>
            </div>
            <p className="text-sm text-gray-400 mb-4">{type.description}</p>
            {type.definition && <CodeBlock code={type.definition} language="rust" />}
            {!type.definition && <FlexibleJson value={type} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function RulesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-white mb-2">{docData.rules_yaml_full.title}</h2>
        <p className="text-gray-500 text-sm mb-4">{docData.rules_yaml_full.description}</p>
        <CodeBlock code={docData.rules_yaml_full.content} language={docData.rules_yaml_full.language} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {docData.rules.map((rule) => (
          <div key={rule.yaml_name} className="rounded-xl border border-green-500/10 bg-[#05070b] p-5 card-hover-glow">
            <div className="flex flex-wrap gap-2 mb-3"><Pill>{rule.yaml_type}</Pill><Pill tone={rule.severity === "critical" ? "red" : rule.severity === "high" ? "yellow" : "gray"}>{rule.severity}</Pill></div>
            <h3 className="font-display font-bold text-white mb-2">{rule.yaml_name}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">{rule.description}</p>
            <div className="text-xs text-gray-500"><span className="text-red-300">Attack:</span> {rule.real_attack}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvilCorpusPage() {
  return (
    <div className="space-y-6">
      <p className="text-gray-400">{docData.evil_corpus.description}</p>
      <div className="flex flex-wrap gap-2">
        <Pill>{docData.evil_corpus.test_command}</Pill>
        <Pill tone="green">{docData.evil_corpus.expected_output}</Pill>
        <Pill tone="gray">{docData.evil_corpus.test_file}</Pill>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {docData.evil_corpus.attacks.map((attack: any) => (
          <div key={attack.id} className="rounded-xl border border-green-500/10 bg-[#05070b] p-4">
            <div className="flex items-center justify-between mb-2"><span className="font-display text-green-400 text-xs">#{attack.id}</span><Pill tone={attack.severity === "critical" ? "red" : attack.severity === "high" ? "yellow" : "gray"}>{attack.rule}</Pill></div>
            <div className="font-display font-bold text-sm text-white mb-1">{attack.name}</div>
            <p className="text-xs text-gray-500 leading-relaxed">{attack.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationPage() {
  const examples = [
    docData.integration.rust_guardian_example,
    docData.integration.rust_kernel_example,
    docData.integration.rust_evaluate_raw_example,
    docData.integration.elizaos_example,
  ];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-4">
        {docData.integration.quick_start.steps.map((step: any) => (
          <div key={step.step} className="rounded-xl border border-green-500/10 bg-[#05070b] p-5">
            <div className="font-display text-green-400 text-xs mb-2">Step {step.step}</div>
            <h3 className="font-display font-bold text-white mb-3">{step.title}</h3>
            <CodeBlock code={step.code} language={step.language} />
          </div>
        ))}
      </div>
      {examples.map((example: any) => (
        <div key={example.title} className="space-y-3">
          <h3 className="font-display font-bold text-white">{example.title}</h3>
          {example.note && <p className="text-sm text-gray-500">{example.note}</p>}
          <CodeBlock code={example.code} language={example.language} />
        </div>
      ))}
    </div>
  );
}

function StatusPage() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {docData.status.phases.map((phase: any) => (
          <div key={phase.phase} className="rounded-xl border border-green-500/10 bg-[#05070b] p-4">
            <div className="flex items-center justify-between mb-2"><span className="font-display text-green-400 text-xs">Phase {phase.phase}</span><Pill tone={phase.status === "complete" ? "green" : "yellow"}>{phase.status}</Pill></div>
            <div className="text-sm text-gray-300">{phase.name}</div>
          </div>
        ))}
      </div>
      <FlexibleJson value={{ test_suite: docData.status.test_suite, hackathon: docData.status.hackathon }} />
    </div>
  );
}

function FaqPage() {
  return (
    <div className="space-y-3">
      {docData.faq.map((item) => (
        <details key={item.question} className="group rounded-xl border border-green-500/10 bg-[#05070b] p-4 open:border-green-500/25">
          <summary className="cursor-pointer font-display font-bold text-white text-sm group-open:text-green-400">{item.question}</summary>
          <p className="text-gray-400 text-sm leading-relaxed mt-3">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

function TeamPage() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {docData.team.map((member) => (
        <div key={member.name} className="rounded-xl border border-green-500/10 bg-[#05070b] p-5">
          <h3 className="font-display font-bold text-white">{member.name}</h3>
          <div className="font-display text-xs text-green-400/80 mt-1 mb-3">{member.role}</div>
          <p className="text-sm text-gray-400 mb-3">{member.education}</p>
          <FlexibleJson value={member.background} />
          <p className="text-xs text-gray-500 mt-3">{member.brings}</p>
        </div>
      ))}
    </div>
  );
}

function renderPage(activeId: PageId) {
  if (activeId === "overview") return <OverviewPage />;
  if (activeId === "problem") return <ProblemPage />;
  if (activeId === "stack") return <StackPage />;
  if (activeId === "pillars") return <PillarsPage />;
  if (activeId === "api") return <ApiPage />;
  if (activeId === "rules") return <RulesPage />;
  if (activeId === "evil-corpus") return <EvilCorpusPage />;
  if (activeId === "integration") return <IntegrationPage />;
  if (activeId === "status") return <StatusPage />;
  if (activeId === "faq") return <FaqPage />;
  if (activeId === "team") return <TeamPage />;
  if (activeId === "simulation-errors") return <FlexibleJson value={docData.simulation_errors} />;
  if (activeId === "demo") return <FlexibleJson value={docData.demo} />;
  if (activeId === "workspace") return <FlexibleJson value={docData.workspace} />;
  if (activeId === "deployment") return <FlexibleJson value={docData.deployment} />;
  if (activeId === "hackathon") return <FlexibleJson value={docData.hackathon} />;
  return <FlexibleJson value={docData} />;
}

function getPageFromHash(): PageId {
  const hash = window.location.hash.replace("#", "") as PageId;
  return pages.some((page) => page.id === hash) ? hash : "overview";
}

export function DocsPage() {
  const [activeId, setActiveId] = useState<PageId>(() => getPageFromHash());
  const [mobileOpen, setMobileOpen] = useState(false);

  const activePage = useMemo(() => pages.find((page) => page.id === activeId) ?? pages[0], [activeId]);

  useEffect(() => {
    const onHashChange = () => setActiveId(getPageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function openPage(id: PageId) {
    setActiveId(id);
    setMobileOpen(false);
    window.history.replaceState(null, "", `/docs#${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-[#080810] text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-grid opacity-35 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(0,232,122,0.08)_0%,transparent_50%)] pointer-events-none" />

      <header className="sticky top-0 z-50 border-b border-green-500/10 bg-[#080810]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-display text-xs">Back to Landing</span>
          </a>
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-display font-bold text-green-400 glow-green-text">SAK</span>
            <span className="font-display text-[9px] tracking-[0.22em] text-green-600/80">DOCS</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden rounded-lg border border-green-500/20 p-2 text-gray-300 hover:text-green-400" aria-label="Open docs menu">
              <Menu className="w-4 h-4" />
            </button>
            <a href={docData.meta.github} target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 rounded-lg border border-green-500/20 px-3 py-2 text-xs text-gray-300 hover:text-green-400 hover:border-green-500/40 transition-colors">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-8 lg:grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="hidden lg:block">
          <Sidebar activeId={activeId} onOpen={openPage} />
        </aside>

        <main>
          <AnimatePresence mode="wait">
            <PageShell key={activePage.id} page={activePage}>
              {renderPage(activeId)}
            </PageShell>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} aria-label="Close menu" />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25 }}
              className="absolute top-0 left-0 bottom-0 w-[84vw] max-w-sm bg-[#080810] border-r border-green-500/15 p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="font-display font-bold text-green-400">SAK Docs</div>
                <button onClick={() => setMobileOpen(false)} className="text-gray-500 hover:text-green-400"><X className="w-5 h-5" /></button>
              </div>
              <Sidebar activeId={activeId} onOpen={openPage} compact />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Sidebar({ activeId, onOpen, compact = false }: { activeId: PageId; onOpen: (id: PageId) => void; compact?: boolean }) {
  return (
    <div className={`${compact ? "" : "sticky top-24"} rounded-2xl border border-green-500/12 bg-[#080810]/75 backdrop-blur-md p-4`}>
      <div className="font-display text-[10px] tracking-[0.25em] text-green-400/70 mb-4 uppercase">Docs Pages</div>
      <nav className="space-y-1">
        {pages.map((page) => {
          const active = activeId === page.id;
          return (
            <button
              key={page.id}
              onClick={() => onOpen(page.id)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                active
                  ? "bg-green-500/12 text-green-300 border border-green-500/20 shadow-[0_0_24px_rgba(0,232,122,0.06)]"
                  : "text-gray-500 hover:text-green-400 hover:bg-green-500/8 border border-transparent"
              }`}
            >
              <span className={active ? "text-green-400" : "text-gray-600"}>{page.icon}</span>
              <span>{page.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default DocsPage;
