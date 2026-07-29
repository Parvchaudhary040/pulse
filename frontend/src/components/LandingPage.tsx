import React from "react";
import {
  Activity,
  ArrowRight,
  KanbanSquare,
  LockKeyhole,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import PulseLogo from "./PulseLogo";

interface LandingPageProps {
  onEnterApp: () => void;
  onGoToLogin: () => void;
  onGoToSignup: () => void;
}

const features = [
  {
    icon: KanbanSquare,
    title: "A board that stays out of your way",
    copy: "Plan releases, assign ownership, and move work forward from one calm, focused view.",
    color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/15",
  },
  {
    icon: Activity,
    title: "Progress you can actually read",
    copy: "Follow activity and sprint health without chasing status updates across tabs and tools.",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/15",
  },
  {
    icon: TrendingUp,
    title: "Signals for better decisions",
    copy: "Turn project movement into clear delivery insights for the whole team.",
    color: "text-violet-500 bg-violet-500/10 border-violet-500/15",
  },
];

function AppPreview() {
  const columns = [
    { name: "Backlog", color: "bg-slate-400", cards: ["Research dashboard", "Content model"] },
    { name: "In progress", color: "bg-indigo-400", cards: ["Polish board states", "Team invitations", "Mobile navigation"] },
    { name: "In review", color: "bg-emerald-400", cards: ["Release notes", "Onboarding flow"] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 7 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.75, delay: 0.2 }}
      className="relative mx-auto w-full max-w-5xl [perspective:1200px]"
    >
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-indigo-500/15 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#11131c] p-2 shadow-[0_28px_90px_rgba(15,23,42,.45)]">
        <div className="flex h-9 items-center gap-1.5 border-b border-white/[.07] px-3">
          <i className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <div className="mx-auto rounded-md bg-white/[.05] px-16 py-1 font-mono text-[8px] text-slate-500">app.pulse.workspace</div>
        </div>
        <div className="grid min-h-[320px] grid-cols-[52px_1fr] md:min-h-[410px] md:grid-cols-[164px_1fr]">
          <aside className="border-r border-white/[.07] p-3 md:p-4">
            <div className="mb-8 hidden md:block"><PulseLogo size="sm" variant="wordmark" /></div>
            <div className="space-y-3">
              {["Overview", "Projects", "My tasks", "Activity"].map((item, index) => (
                <div key={item} className={`flex items-center gap-2 rounded-md px-2 py-2 text-[9px] ${index === 1 ? "bg-indigo-500/15 text-indigo-300" : "text-slate-500"}`}>
                  <span className={`h-2 w-2 rounded-sm ${index === 1 ? "bg-indigo-400" : "bg-slate-600"}`} />
                  <span className="hidden md:inline">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 hidden rounded-lg border border-white/[.07] bg-white/[.025] p-2 md:block"><p className="text-[8px] text-slate-500">Your sprint</p><p className="mt-1 text-[11px] font-bold text-white">72% complete</p><div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-emerald-400" /></div></div>
          </aside>
          <div className="p-4 md:p-6">
            <div className="flex items-start justify-between"><div><p className="text-[10px] text-slate-500">Projects / Website refresh</p><h3 className="mt-1 text-sm font-bold text-white md:text-lg">Q3 product launch</h3></div><button className="flex items-center gap-1 rounded-lg bg-indigo-500 px-2 py-1.5 text-[9px] font-semibold text-white md:px-3"><Plus className="h-3 w-3" /> <span className="hidden sm:inline">New task</span></button></div>
            <div className="mt-5 flex items-center gap-4 border-b border-white/[.07] pb-3 text-[9px]"><span className="font-semibold text-white">Board</span><span className="text-slate-500">Timeline</span><span className="text-slate-500">Insights</span><span className="ml-auto hidden text-emerald-300 sm:inline">● On track</span></div>
            <div className="mt-4 grid grid-cols-3 gap-2 md:gap-3">
              {columns.map((column) => <div key={column.name} className="min-w-0 rounded-lg bg-white/[.025] p-2 md:p-3"><div className="flex items-center justify-between"><span className="text-[8px] font-semibold text-slate-400 md:text-[10px]">{column.name}</span><span className="text-[8px] text-slate-600">{column.cards.length}</span></div><div className="mt-3 space-y-2">{column.cards.map((card, index) => <div key={card} className="rounded-md border border-white/[.06] bg-[#191d2a] p-2 md:p-2.5"><span className={`mb-2 block h-1 w-4 rounded-full ${index === 0 ? column.color : "bg-violet-400"}`} /><p className="truncate text-[8px] text-slate-200 md:text-[10px]">{card}</p><div className="mt-3 flex items-center justify-between"><span className="h-3 w-3 rounded-full bg-slate-600" /><span className="text-[7px] text-slate-600">Oct {12 + index}</span></div></div>)}</div></div>)}
            </div>
          </div>
        </div>
      </div>
      <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -right-5 -top-7 hidden rounded-xl border border-white/15 bg-[#171a27]/95 p-3 shadow-xl backdrop-blur md:block"><p className="text-[9px] text-slate-500">Sprint velocity</p><div className="mt-1 flex items-baseline gap-1"><span className="text-xl font-bold text-white">+18%</span><span className="text-[9px] text-emerald-300">this week</span></div></motion.div>
    </motion.div>
  );
}

export default function LandingPage({ onEnterApp, onGoToLogin, onGoToSignup }: LandingPageProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-app text-primary selection:bg-indigo-500 selection:text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,.16),transparent_33%)]" />

      <header className="sticky top-0 z-50 border-b border-default/70 bg-app/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <PulseLogo size="md" />
          <nav className="hidden items-center gap-7 text-sm font-medium text-secondary md:flex">
            <a href="#features" className="transition hover:text-primary">Features</a>
            <a href="#workflow" className="transition hover:text-primary">How it works</a>
            <a href="#faq" className="transition hover:text-primary">FAQ</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={onGoToLogin} className="hidden px-3 py-2 text-sm font-medium text-secondary transition hover:text-primary sm:block">Sign in</button>
            <button onClick={onGoToSignup} className="hidden rounded-lg border border-default px-3 py-2 text-sm font-medium transition hover:bg-surface-2 sm:block">Register</button>
            <button onClick={onEnterApp} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500">Launch app <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </header>

      <section className="relative px-6 pb-20 pt-20 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-500"><Sparkles className="h-3.5 w-3.5 text-emerald-500" /> A calmer way to run product work</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="mt-7 text-5xl font-extrabold leading-[.96] tracking-[-.055em] md:text-7xl">Make progress<br /><span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">visible to everyone.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }} className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-secondary md:text-lg">Pulse gives your team a shared place to plan work, follow momentum, and deliver the next great thing without the status-chasing.</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={onEnterApp} className="group flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-indigo-600/25 transition hover:bg-indigo-500">Start building <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></button><a href="#features" className="rounded-xl border border-default bg-surface/70 px-6 py-3.5 font-semibold text-secondary transition hover:bg-surface-2 hover:text-primary">Explore features</a></motion.div>
        </div>
        <div className="mt-16"><AppPreview /></div>
      </section>

      <section className="border-y border-default bg-surface/45 py-7"><p className="text-center font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-secondary">A thoughtful workspace for teams that ship</p><div className="mx-auto mt-5 flex max-w-5xl flex-wrap justify-center gap-x-12 gap-y-3 text-base font-bold tracking-wide text-secondary/60"><span>stripe</span><span className="font-mono">vercel</span><span>Linear</span><span className="font-serif tracking-[.18em]">NOTION</span><span className="font-mono">github</span></div></section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24"><div className="max-w-2xl"><p className="font-mono text-xs font-bold tracking-[.18em] text-emerald-500">BUILT FOR REAL WORK</p><h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">Everything you need to keep the team moving.</h2><p className="mt-4 font-light leading-relaxed text-secondary">Less process theater. More clarity, momentum, and confident delivery.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{features.map(({ icon: Icon, title, copy, color }) => <article key={title} className="rounded-2xl border border-default bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-xl"><span className={`grid h-11 w-11 place-items-center rounded-xl border ${color}`}><Icon className="h-5 w-5" /></span><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-3 text-sm font-light leading-relaxed text-secondary">{copy}</p></article>)}</div></section>

      <section id="workflow" className="border-y border-default bg-surface-2/35 py-24"><div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_.95fr]"><div><p className="font-mono text-xs font-bold tracking-[.18em] text-indigo-500">A SIMPLE RHYTHM</p><h2 className="mt-3 text-4xl font-extrabold tracking-tight">From a good idea to a great release.</h2><p className="mt-5 max-w-xl font-light leading-relaxed text-secondary">Pulse keeps your process connected—from the first task through to the last review—so each person knows what matters next.</p><div className="mt-9 space-y-5">{[["01", "Plan the work", "Create tasks, group projects, and give every piece of work a clear home."], ["02", "Move together", "See ownership and status at a glance while the team does the work."], ["03", "Learn and improve", "Use activity and delivery signals to make the next sprint even better."]].map(([number, title, copy]) => <div key={number} className="flex gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-500/10 font-mono text-xs font-bold text-indigo-500">{number}</span><div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1 text-sm font-light leading-relaxed text-secondary">{copy}</p></div></div>)}</div><button onClick={onEnterApp} className="mt-9 inline-flex items-center gap-2 font-semibold text-indigo-500 transition hover:text-indigo-400">Open your workspace <ArrowRight className="h-4 w-4" /></button></div><div className="rounded-2xl border border-default bg-surface p-6 shadow-xl"><div className="flex items-center justify-between"><div><p className="text-xs text-secondary">This week</p><h3 className="mt-1 text-xl font-bold">Team momentum</h3></div><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">On track</span></div><div className="mt-8 grid grid-cols-3 gap-3"><div className="rounded-xl bg-indigo-500/10 p-4"><p className="text-xs text-secondary">Completed</p><p className="mt-1 text-2xl font-extrabold">24</p></div><div className="rounded-xl bg-emerald-500/10 p-4"><p className="text-xs text-secondary">Velocity</p><p className="mt-1 text-2xl font-extrabold">+18%</p></div><div className="rounded-xl bg-violet-500/10 p-4"><p className="text-xs text-secondary">Focus</p><p className="mt-1 text-2xl font-extrabold">82%</p></div></div><div className="mt-7 space-y-4">{[["Review checkout flow", "In review", "bg-emerald-500"], ["Prepare release notes", "In progress", "bg-indigo-500"], ["Triage customer feedback", "Planned", "bg-slate-400"]].map(([task, state, color]) => <div key={task} className="flex items-center gap-3"><span className={`h-2 w-2 rounded-full ${color}`} /><span className="flex-1 text-sm font-medium">{task}</span><span className="text-xs text-secondary">{state}</span></div>)}</div></div></div></section>

      <section id="faq" className="mx-auto max-w-3xl px-6 py-24"><div className="text-center"><p className="font-mono text-xs font-bold tracking-[.18em] text-emerald-500">GETTING STARTED</p><h2 className="mt-3 text-3xl font-extrabold">A few common questions.</h2></div><div className="mt-10 space-y-3">{[["What can I do in the Pulse sandbox?", "You can explore a working Pulse workspace with projects, boards, activity, and settings."], ["Is Pulse useful for small teams?", "Yes. Pulse is designed to be simple enough for a small team and structured enough for bigger launches."], ["Can I manage workspace access?", "Yes. Workspace and account controls help you keep your team information protected."]].map(([question, answer]) => <details key={question} className="group rounded-xl border border-default bg-surface px-5 py-4"><summary className="cursor-pointer list-none text-sm font-bold">{question}<span className="float-right text-lg leading-none text-indigo-500 transition group-open:rotate-45">+</span></summary><p className="pt-3 text-sm font-light leading-relaxed text-secondary">{answer}</p></details>)}</div></section>

      <section className="border-y border-default bg-[#11131c] px-6 py-20 text-center text-white"><LockKeyhole className="mx-auto h-5 w-5 text-emerald-300" /><h2 className="mt-4 text-3xl font-extrabold tracking-tight">Ready for a clearer workspace?</h2><p className="mx-auto mt-3 max-w-lg text-sm font-light leading-relaxed text-slate-400">Bring your product work into focus with a team workspace built for momentum.</p><button onClick={onEnterApp} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-400">Launch Pulse <ArrowRight className="h-4 w-4" /></button></section>

      <footer className="px-6 py-9"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-sm text-secondary sm:flex-row"><PulseLogo size="sm" /><p>© 2026 Pulse. Make progress visible.</p><div className="flex gap-5"><a href="#features" className="hover:text-primary">Features</a><a href="#workflow" className="hover:text-primary">Workflow</a><a href="#faq" className="hover:text-primary">FAQ</a></div></div></footer>
    </main>
  );
}
