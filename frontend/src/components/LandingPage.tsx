import React from "react";
import { 
  Layers, 
  Shield, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Kanban, 
  Activity, 
  Lock, 
  Laptop, 
  Check 
} from "lucide-react";
import { motion } from "motion/react";
import PulseLogo from "./PulseLogo";

interface LandingPageProps {
  onEnterApp: () => void;
  onGoToLogin: () => void;
  onGoToSignup: () => void;
}

export default function LandingPage({ onEnterApp, onGoToLogin, onGoToSignup }: LandingPageProps) {
  return (
    <div className="bg-app text-[#f4f6fe] min-h-screen font-sans selection:bg-[#4f46e5] selection:text-primary overflow-x-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#6366f1]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] right-10 w-[600px] h-[600px] bg-[#10b981]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370c_1px,transparent_1px),linear-gradient(to_bottom,#1f29370c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-default/60 backdrop-blur-md sticky top-0 z-50 bg-app/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <PulseLogo size="md" />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-secondary font-medium">
            <a href="#features" className="hover:text-primary transition-colors duration-200">Features</a>
            <a href="#workflow" className="hover:text-primary transition-colors duration-200">Workflow</a>
            <a href="#pricing" className="hover:text-primary transition-colors duration-200">Pricing</a>
            <a href="#faq" className="hover:text-primary transition-colors duration-200">Docs</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onGoToLogin} 
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-primary hover:bg-gray-800/40 rounded-lg transition-all"
            >
              Sign In
            </button>
            <button 
              onClick={onGoToSignup} 
              className="px-4 py-2 text-sm font-medium bg-[#1a1b24] hover:bg-[#20222f] border border-default/80 rounded-lg text-primary transition-all duration-200 shadow-sm"
            >
              Register
            </button>
            <button 
              onClick={onEnterApp} 
              className="bg-indigo-600 hover:bg-indigo-500 text-primary text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-indigo-600/35 hover:scale-[1.02]"
            >
              Launch Sandbox
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-indigo-950/40 text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#6366f1]/30 mb-8 shadow-inner backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Introducing the Pulse Workspace platform</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-none"
          >
            Plan. Track.<br />
            <span className="bg-gradient-to-r from-[#4f46e5] via-[#a855f7] to-[#10b981] bg-clip-text text-transparent">
              Deliver.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Pulse is the next-generation workflow applet designed for high-performing tech teams. Track projects, coordinate code-merges, and view beautiful sprint telemetry in real-time.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onEnterApp}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-505 bg-indigo-600 hover:from-indigo-550 hover:to-indigo-500 hover:shadow-indigo-500/30 text-primary font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-3 text-base group"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-default bg-surface-2/30 text-gray-300 hover:text-primary hover:bg-gray-800/45 transition-all text-base font-semibold text-center"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* Customer Trust Brands Banner */}
      <section className="py-8 border-y bg-surface-2
hover:bg-indigo-100
border border-default bg-[#08090d]/60 mb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">Empowering developers & designers at swift companies</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40 grayscale hover:opacity-75 transition-opacity duration-300">
            <span className="font-extrabold text-lg tracking-wider font-sans">stripe</span>
            <span className="font-semibold text-lg tracking-wider font-mono">Vercel</span>
            <span className="font-bold text-lg tracking-wide font-sans">Linear</span>
            <span className="font-extralight text-lg tracking-widest font-serif">N O T I O N</span>
            <span className="font-mono text-lg tracking-tighter">github_projects</span>
          </div>
        </div>
      </section>

      {/* Value Features Section */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#10b981] mb-2 font-bold select-none">DESIGNED FOR SPEED</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
            Supercharged project telemetry.
          </h3>
          <p className="text-secondary mt-4 max-w-xl mx-auto font-light">
            No endless configurations, no laggy spreadsheets. Pulse runs at sub-100ms response cycles with full client cache updates.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-surface/95 border border-default/80 hover:border-indigo-500/40 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Kanban className="w-6 h-6 text-indigo-400" />
            </div>
            <h4 className="text-xl font-bold text-primary mb-2">Omnipresent Board Tracker</h4>
            <p className="text-secondary text-sm font-light leading-relaxed">
              Plan and drag cards seamlessly. Keep track of features, releases, and priority backlogs via clean board layouts.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-surface/95 border border-default/80 hover:border-[#10b981]/40 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-[#10b981]" />
            </div>
            <h4 className="text-xl font-bold text-primary mb-2">Live Activity Timelines</h4>
            <p className="text-secondary text-sm font-light leading-relaxed">
              Track work accomplishments of every teammate. Post live log summaries, upload revision specifications, and map outcomes.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-surface/95 border border-default/80 hover:border-purple-500/40 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-xl font-bold text-primary mb-2">Rich Analytics Visualizers</h4>
            <p className="text-secondary text-sm font-light leading-relaxed">
              View beautiful graphs showing sprint velocity, project distribution metrics, and priority distribution panels.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid (Interactive Design feel) */}
      <section id="workflow" className="py-16 bg-[#08090d]/80 border-y bg-surface-2
hover:bg-indigo-100
border border-default relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-950/20 text-[#6366f1] text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-indigo-900/40 mb-6 font-semibold">
                PRODUCT PLATFORM SHOWCASE
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight leading-tight mb-6">
                Engineered for speed, built for product builders.
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  "Responsive sidebar toggles and quick filter categories",
                  "Interactive dialog sheets for swift task creation",
                  "Secure token auth proxies and credential shields",
                  "Simulated live mobile layout frame preview switcher"
                ].map((item, id) => (
                  <li key={id} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                    <span className="text-gray-300 font-light text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={onEnterApp}
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-all group"
              >
                Launch application sandbox now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Simulated Desktop Preview Card */}
            <div className="relative p-2 rounded-2xl bg-surface-2/40 border border-default/80 shadow-2xl backdrop-blur-sm overflow-hidden">
              <div className="h-6 flex items-center gap-1.5 px-4 border-b border-default bg-[#0f111a]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <div className="text-[10px] font-mono text-gray-500 mx-auto select-none">pulse_workspace_mockup.host</div>
              </div>
              <div className="bg-app p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-default/60 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#6366f1]/20 border border-[#6366f1]/40" />
                    <div>
                      <div className="h-3 w-28 bg-gray-700/80 rounded" />
                      <div className="h-2 w-16 bg-gray-800 mt-1.5 rounded" />
                    </div>
                  </div>
                  <div className="h-6 w-14 bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 rounded-full flex items-center justify-center text-[10px] font-mono">
                    65% Done
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="p-3 bg-surface-2/60 rounded-xl border border-default flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      <div className="h-2.5 w-36 bg-gray-600 rounded" />
                    </div>
                    <div className="h-2 w-10 bg-gray-800 rounded" />
                  </div>
                  <div className="p-3 bg-surface-2/60 rounded-xl border border-default flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <div className="h-2.5 w-40 bg-gray-600 rounded" />
                    </div>
                    <div className="h-2 w-10 bg-gray-800 rounded" />
                  </div>
                  <div className="p-3 bg-surface-2/30 rounded-xl border border-default/40 opacity-40 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-red-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                      <div className="h-2.5 w-24 bg-gray-700 rounded" />
                    </div>
                    <div className="h-2 w-10 bg-gray-800 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#6366f1] mb-2 font-bold select-none">TRANSPARENT PLANS</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
            Flexible pricing for scales.
          </h3>
          <p className="text-secondary mt-4 max-w-xl mx-auto font-light">
            Secure workspace coordinates, detailed checklists, and analytics features. Upgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-[#0e0f14] border border-default flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">INDIVIDUAL</span>
              <h4 className="text-2xl font-bold text-primary mt-1 mb-4">Starter</h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-primary">$0</span>
                <span className="text-xs text-gray-500 font-mono">/ FOREVER</span>
              </div>
              <p className="text-sm text-secondary font-light mb-8">
                Perfect for solos, developers, and product managers building simple personal dashboards.
              </p>
              <ul className="space-y-4 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>3 Active Projects</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Interactive Kanban Board</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Basic SVG Sparkline Graphs</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={onEnterApp}
              className="w-full py-3 rounded-lg border border-default bg-surface-2/30 hover:bg-gray-800 text-primary font-medium text-sm transition-all"
            >
              Get Started Free
            </button>
          </div>

          {/* Card 2 - Featured */}
          <div className="p-8 rounded-2xl bg-surface border-2 border-indigo-600 flex flex-col justify-between relative shadow-2xl">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-600 text-primary text-[10px] uppercase font-mono tracking-widest h-6 px-3 rounded-full flex items-center justify-center font-bold">
              MOST POPULAR
            </div>
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">TEAM CLUSTER</span>
              <h4 className="text-2xl font-bold text-primary mt-1 mb-4">Pulse Pro</h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-primary">$24</span>
                <span className="text-xs text-secondary font-mono">/ USER MONTHLY</span>
              </div>
              <p className="text-sm text-secondary font-light mb-8">
                For fast engineering organizations launching production-grade applets, designs, and code databases.
              </p>
              <ul className="space-y-4 mb-8 text-sm text-gray-350">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span className="text-primary">Uncapped Web Projects</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span className="text-primary">Detailed Activity Timelines</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Custom Task Properties</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Pre-built Mobile Simulator App</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={onEnterApp}
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-primary font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.01]"
            >
              Enter Pro Sandbox
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-[#0e0f14] border border-default flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">ENTERPRISE CLUD</span>
              <h4 className="text-2xl font-bold text-primary mt-1 mb-4">Custom Scale</h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-primary">Contact</span>
                <span className="text-xs text-gray-500 font-mono">/ CUSTOM TERMS</span>
              </div>
              <p className="text-sm text-secondary font-light mb-8">
                For enterprise accounts needing SOC2 checklists, regional isolation parameters, and fully dedicated priority lanes.
              </p>
              <ul className="space-y-4 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Dedicated SSO Integrations</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Full Security Audit Toggles</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Premium Account Lead</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={onEnterApp}
              className="w-full py-3 rounded-lg border border-default bg-surface-2/30 hover:bg-gray-800 text-primary font-medium text-sm transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Docs FAQ Section */}
      <section id="faq" className="py-16 bg-[#08090d]/60 border-t bg-surface-2
hover:bg-indigo-100
border border-default relative">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-extrabold text-primary text-center tracking-tight mb-12">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="p-6 bg-surface-2/30 rounded-xl border border-default/80">
              <h4 className="text-base font-bold text-primary mb-2">Can I manage tasks across desktop and mobile screens simultaneously?</h4>
              <p className="text-sm text-secondary font-light">
                Absolutely! Our platform features an interactive **Mobile Simulator view** built directly into the sidebar panel, allowing you to quickly monitor the layout responsiveness and run fast checks without switching devices.
              </p>
            </div>
            <div className="p-6 bg-surface-2/30 rounded-xl border border-default/80">
              <h4 className="text-base font-bold text-primary mb-2">What is the Pulse sandbox environment?</h4>
              <p className="text-sm text-secondary font-light">
                This is a fully-loaded Client-side Sandbox featuring beautiful animated SVG charts, realistic drag-status boards, detail timelines, settings pages, and custom task-creation modals stored in persistent **localStorage** state layers.
              </p>
            </div>
            <div className="p-6 bg-surface-2/30 rounded-xl border border-default/80">
              <h4 className="text-base font-bold text-primary mb-2">Can I customize notification parameters?</h4>
              <p className="text-sm text-secondary font-light">
                Yes. Under the Account Settings tab in the sidebar navigation, you can toggle email updates, security access, view billing structures, and audit security histories dynamically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-surface-2
hover:bg-indigo-100
border border-default bg-[#06070a]/90 py-12 px-6 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <PulseLogo size="sm" />
          <p className="font-light">© 2026 Pulse SaaS Platform. Recreated with ultimate care & precision.</p>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-primary transition-colors duration-200">System</a>
            <a href="#pricing" className="hover:text-primary transition-colors duration-200">Rules</a>
            <a href="#workflow" className="hover:text-primary transition-colors duration-200">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
