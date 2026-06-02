import Link from 'next/link';
import {
  FileText,
  Sparkles,
  Download,
  Palette,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Layout,
  Eye,
} from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Live Preview',
    description: 'See your resume update in real-time as you type. No refreshing, no waiting.',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Palette,
    title: 'Premium Templates',
    description: 'Choose from Modern, Executive, and Minimalist designs crafted by professionals.',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    icon: Download,
    title: 'PDF Export',
    description: 'Export crisp, ATS-friendly PDFs with fully selectable vector text.',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Shield,
    title: '100% Private',
    description: 'All data stays in your browser. Nothing is uploaded to any server.',
    gradient: 'from-orange-500 to-amber-400',
  },
  {
    icon: Layout,
    title: 'Fully Customizable',
    description: 'Adjust colors, fonts, spacing, and section ordering to match your style.',
    gradient: 'from-rose-500 to-red-400',
  },
  {
    icon: Zap,
    title: 'Auto-Save',
    description: 'Your progress is automatically saved locally. Never lose your work.',
    gradient: 'from-indigo-500 to-violet-400',
  },
];

const steps = [
  { step: '01', title: 'Fill In Your Details', description: 'Enter your experience, education, skills, and projects using our intuitive editor.' },
  { step: '02', title: 'Choose a Template', description: 'Pick from professionally designed templates and customize colors, fonts, and spacing.' },
  { step: '03', title: 'Export as PDF', description: 'Download your polished, ATS-optimized resume with a single click.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-text-primary">
              Resume<span className="text-primary-light">Maker</span>
            </span>
          </div>
          <Link
            href="/builder"
            className="btn btn-primary text-sm"
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            Free &middot; No Sign-up &middot; 100% Private
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Build a Resume
            <br />
            <span className="bg-gradient-to-r from-primary-light via-accent to-primary bg-clip-text text-transparent">
              That Gets Noticed
            </span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Create stunning, professional resumes in minutes with our modern builder. Choose from
            premium templates, customize every detail, and export a perfect PDF — completely free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/builder"
              className="btn btn-primary text-base px-8 py-3 animate-pulse-glow"
            >
              <Sparkles className="w-5 h-5" />
              Create Your Resume
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/builder?sample=true"
              className="btn btn-ghost text-base px-8 py-3"
            >
              <Eye className="w-5 h-5" />
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything You Need
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Professional features that help you craft the perfect resume, without the bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-xl bg-surface-light border border-border hover:border-border-light transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className={`w-11 h-11 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-surface-light/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Three Simple Steps
            </h2>
            <p className="text-text-secondary text-lg">
              From blank page to polished PDF in under 10 minutes.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((item, idx) => (
              <div key={item.step} className="flex gap-6 items-start group">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-surface-light to-accent/10 border border-border">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build?</h2>
            <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto">
              Join thousands who have already created professional resumes with our builder.
            </p>
            <Link
              href="/builder"
              className="btn btn-primary text-base px-10 py-3.5"
            >
              <Sparkles className="w-5 h-5" />
              Get Started — It&apos;s Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-text-muted">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> Free forever</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> No sign-up</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> ATS-friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>ResumeMaker</span>
          </div>
          <p>&copy; {new Date().getFullYear()} ResumeMaker. Built with Next.js</p>
        </div>
      </footer>
    </div>
  );
}
