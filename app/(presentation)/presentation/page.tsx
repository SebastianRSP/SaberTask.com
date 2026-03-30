'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

/* ───────────────────────────────────────────
   Section definitions
   ─────────────────────────────────────────── */
const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'overview', label: 'Overview' },
  { id: 'live-dashboard', label: 'Live Dashboard' },
  { id: 'locations', label: 'Locations' },
  { id: 'routes', label: 'Routes' },
  { id: 'subcontractors', label: 'Subcontractors' },
  { id: 'weather', label: 'Weather' },
  { id: 'more', label: 'More Features' },
  { id: 'contractors', label: 'Contractors' },
  { id: 'contact', label: 'Contact' },
] as const;

/* ───────────────────────────────────────────
   Active section tracker
   ─────────────────────────────────────────── */
function useActiveSection() {
  const [active, setActive] = useState(0);
  const ratios = useRef<number[]>(new Array(SECTIONS.length).fill(0));

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = els.indexOf(entry.target as HTMLElement);
          if (idx !== -1) ratios.current[idx] = entry.intersectionRatio;
        }
        let bestIdx = 0;
        let bestRatio = 0;
        for (let i = 0; i < ratios.current.length; i++) {
          if (ratios.current[i] > bestRatio) {
            bestRatio = ratios.current[i];
            bestIdx = i;
          }
        }
        setActive(bestIdx);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

/* ───────────────────────────────────────────
   Scroll helpers
   ─────────────────────────────────────────── */
function scrollToSection(index: number) {
  const clamped = Math.max(0, Math.min(index, SECTIONS.length - 1));
  const el = document.getElementById(SECTIONS[clamped].id);
  el?.scrollIntoView({ behavior: 'smooth' });
}

/* ───────────────────────────────────────────
   Fade-in on scroll
   ─────────────────────────────────────────── */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ───────────────────────────────────────────
   Scale-to-fit slide wrapper
   ─────────────────────────────────────────── */
function SlideContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      // Only scale on md+ screens
      if (window.innerWidth < 768) {
        setScale(1);
        return;
      }
      inner.style.transform = 'scale(1)';
      const availableH = outer.clientHeight;
      const contentH = inner.scrollHeight;
      const newScale = contentH > availableH ? availableH / contentH : 1;
      setScale(Math.min(newScale, 1));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div ref={outerRef} className={`relative z-10 w-full md:h-full flex items-center justify-center ${className}`}>
      <div
        ref={innerRef}
        className="w-full origin-center"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────
   Top navigation bar
   ─────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection(0); }} className="flex items-center gap-2">
          <Image src="/icon.png" alt="SnowManager" width={32} height={32} className="w-8 h-8" />
          <span className={`font-heading font-bold text-lg transition-colors duration-500 ${scrolled ? 'text-dark' : 'text-white'}`}>SnowManager</span>
        </a>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollToSection(SECTIONS.length - 1); }}
          className="bg-primary text-white px-5 py-2 rounded-btn text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          Get in touch
        </a>
      </div>
    </nav>
  );
}

/* ───────────────────────────────────────────
   Fixed section navigation (bottom-right)
   ─────────────────────────────────────────── */
function SectionNav({ active }: { active: number }) {
  const isFirst = active === 0;
  const isLast = active === SECTIONS.length - 1;

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:flex flex-col items-center gap-3">
      <button
        onClick={() => scrollToSection(active - 1)}
        disabled={isFirst}
        aria-label="Previous section"
        className={`w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center transition-all duration-200 ${
          isFirst
            ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white/60'
            : 'border-gray-300 text-gray-600 hover:bg-primary hover:text-white hover:border-primary bg-white/80 shadow-sm cursor-pointer'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
      </button>

      <div className="flex flex-col items-center gap-1.5 py-2">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(i)}
            aria-label={section.label}
            title={section.label}
            className="group relative flex items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-2.5 h-2.5 bg-primary shadow-[0_0_8px_rgba(68,98,248,0.5)]'
                  : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-500'
              }`}
            />
            <span className="absolute right-full mr-3 px-2 py-1 bg-dark text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {section.label}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => scrollToSection(active + 1)}
        disabled={isLast}
        aria-label="Next section"
        className={`w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center transition-all duration-200 ${
          isLast
            ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white/60'
            : 'border-gray-300 text-gray-600 hover:bg-primary hover:text-white hover:border-primary bg-white/80 shadow-sm cursor-pointer'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      <span className="text-[10px] text-gray-400 font-mono tabular-nums">
        {active + 1}/{SECTIONS.length}
      </span>
    </div>
  );
}


/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function PresentationPage() {
  const active = useActiveSection();

  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = window.innerWidth >= 768 ? 'y proximity' : 'none';
    html.style.scrollBehavior = 'smooth';

    return () => {
      html.style.scrollSnapType = '';
      html.style.scrollBehavior = '';
    };
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToSection(active + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToSection(active - 1);
    }
  }, [active]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const snap: React.CSSProperties = { scrollSnapAlign: 'start' };

  return (
    <>
      <Nav />
      <SectionNav active={active} />

      {/* ── 1. HERO ────────────────────────────── */}
      <section id="hero" style={snap} className="relative min-h-screen md:h-screen md:overflow-hidden bg-gradient-to-br from-dark via-[#0f1629] to-[#111d3a] flex flex-col justify-center">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />

        <SlideContent>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <FadeIn delay={100}>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              One platform for all your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-100">winter operations</span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              SnowManager replaces spreadsheets, phone calls, and manual invoicing with one intelligent platform — built specifically for snow removal.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <button
              onClick={() => scrollToSection(SECTIONS.length - 1)}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-btn text-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Get in touch
              <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </FadeIn>
        </div>

        <div className="flex flex-col items-center gap-2 text-gray-500 mt-8">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-gray-500 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
        </SlideContent>
      </section>

      {/* ── 2. PLATFORM OVERVIEW ─────────────────── */}
      <section id="overview" style={snap} className="min-h-screen md:h-screen md:overflow-hidden bg-white">
        <SlideContent>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <FadeIn>
            <p className="text-primary font-semibold text-sm sm:text-base uppercase tracking-wider mb-2 sm:mb-3">Platform Overview</p>
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-dark mb-3 sm:mb-6">
              Everything you need, in one place
            </h2>
            <p className="text-gray-500 text-base sm:text-xl max-w-3xl mb-6 sm:mb-16">
              SnowManager brings together every tool your snow removal business needs — from planning and dispatch to invoicing and customer reporting.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-16">
            {[
              { title: 'Live Dashboard', desc: 'Monitor all crews, routes, and jobs in real-time from one central command center.', icon: (<svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>) },
              { title: 'Location Management', desc: 'Manage all your customer locations with precise service area mapping.', icon: (<svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>) },
              { title: 'Smart Route Builder', desc: 'Build optimized routes that minimize drive time and maximize coverage.', icon: (<svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>) },
              { title: 'Subcontractor Portal', desc: 'Seamlessly assign jobs to subcontractors and track their work in real-time.', icon: (<svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>) },
              { title: 'Live Weather Forecast', desc: 'Built-in weather data so you always know when to deploy your crews.', icon: (<svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>) },
              { title: 'Automatic Invoicing', desc: 'Generate invoices automatically from completed jobs. No manual data entry.', icon: (<svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>) },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="text-primary mb-2 sm:mb-4">{f.icon}</div>
                  <h3 className="font-heading font-bold text-sm sm:text-xl text-dark mb-1 sm:mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-base leading-relaxed hidden sm:block">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="bg-gradient-to-r from-primary to-primary-600 rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12">
              <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
                {[
                  { value: '70%', label: 'Less admin work' },
                  { value: '85%', label: 'Less time on invoicing' },
                  { value: '30%', label: 'Lower operating costs' },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">{stat.value}</p>
                    <p className="text-primary-100 text-xs sm:text-base font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
        </SlideContent>
      </section>

      {/* ── 3. LIVE DASHBOARD ────────────────────── */}
      <section id="live-dashboard" style={snap} className="relative min-h-screen md:h-screen md:overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-[#0f1629] to-[#111d3a]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <SlideContent>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FadeIn>
            <p className="text-primary-300 font-semibold text-base uppercase tracking-wider mb-3">Live Dashboard</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Your entire operation at a glance
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mb-12">
              See every crew, every route, and every job in real-time. Know instantly who is where, what&apos;s been completed, and what needs attention — no phone calls needed.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="aspect-[16/9] w-full max-w-4xl relative rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/presentation/dashboard.jpg" alt="SnowManager Live Dashboard" fill className="object-cover" />
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              {[
                { title: 'Real-time GPS tracking', desc: 'See all crew positions live on the map with automatic status updates.' },
                { title: 'Instant reassignment', desc: 'When a driver is sick or delayed, reassign jobs with a single click.' },
                { title: 'Complete audit trail', desc: 'Every action is logged with timestamps, photos, and GPS verification.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
        </SlideContent>
      </section>

      {/* ── 4. LOCATION MANAGEMENT ───────────────── */}
      <section id="locations" style={snap} className="min-h-screen md:h-screen md:overflow-hidden bg-white">
        <SlideContent>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <p className="text-primary font-semibold text-base uppercase tracking-wider mb-3">Location Management</p>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6">
                  Every address, perfectly mapped
                </h2>
                <p className="text-gray-500 text-xl mb-8 leading-relaxed">
                  Manage all your customer locations in one place. Use our drawing tool to define exact service areas — driveways, walkways, parking lots — so every crew member knows exactly where to work.
                </p>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="space-y-4">
                  {[
                    { title: 'Drawing tool', desc: 'Define precise service boundaries on satellite imagery.' },
                    { title: 'Service zones', desc: 'Color-code different areas like driveways, walkways, and lots.' },
                    { title: 'Customer details', desc: 'Store contact info, special instructions, and access codes.' },
                    { title: 'Pricing per location', desc: 'Set individual pricing based on area size and service type.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark">{item.title}</h3>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={200}>
              <div className="aspect-[4/3] w-full relative rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/presentation/location.png" alt="SnowManager Location Management" fill className="object-cover" />
              </div>
            </FadeIn>
          </div>
        </div>
        </SlideContent>
      </section>

      {/* ── 5. ROUTE BUILDING ────────────────────── */}
      <section id="routes" style={snap} className="relative min-h-screen md:h-screen md:overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-[#0f1629] to-[#111d3a]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <SlideContent>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="aspect-[4/3] w-full relative rounded-2xl overflow-hidden shadow-2xl bg-white">
                <Image src="/presentation/route.png" alt="SnowManager Route Builder" fill className="object-contain" />
              </div>
            </FadeIn>

            <div>
              <FadeIn delay={100}>
                <p className="text-primary-300 font-semibold text-base uppercase tracking-wider mb-3">Smart Route Builder</p>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                  Optimized routes in seconds
                </h2>
                <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                  Build the most efficient routes for your crews. Our route builder considers location, priority, and equipment to minimize drive time and maximize coverage.
                </p>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="space-y-4">
                  {[
                    { title: 'Drag-and-drop editing', desc: 'Reorder stops easily with instant route recalculation.' },
                    { title: 'Multi-crew assignment', desc: 'Split routes across crews based on capacity and proximity.' },
                    { title: 'Priority handling', desc: 'Ensure high-priority locations are always serviced first.' },
                    { title: 'Automatic rebalancing', desc: 'Routes adjust automatically when new jobs are added.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
        </SlideContent>
      </section>

      {/* ── 6. SUBCONTRACTOR MANAGEMENT ──────────── */}
      <section id="subcontractors" style={snap} className="min-h-screen md:h-screen md:overflow-hidden bg-white">
        <SlideContent>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <p className="text-primary font-semibold text-base uppercase tracking-wider mb-3">Subcontractor Management</p>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6">
                  Your full network, one platform
                </h2>
                <p className="text-gray-500 text-xl mb-8 leading-relaxed">
                  Manage your entire subcontractor network effortlessly. Assign jobs, track progress, and handle documentation — all without a single phone call.
                </p>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="space-y-4">
                  {[
                    { title: 'Dedicated subcontractor portal', desc: 'Subs get their own login to receive and complete jobs.' },
                    { title: 'Real-time tracking', desc: 'See subcontractor progress and proof of service as it happens.' },
                    { title: 'Automated payment tracking', desc: 'Clear documentation eliminates payment disputes.' },
                    { title: 'Performance overview', desc: 'Track completion rates, response times, and quality scores.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark">{item.title}</h3>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={200}>
              <div className="aspect-[4/3] w-full relative rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/presentation/subcontractor.png" alt="SnowManager Subcontractor Management" fill className="object-cover" />
              </div>
            </FadeIn>
          </div>
        </div>
        </SlideContent>
      </section>

      {/* ── 7. LIVE WEATHER FORECAST ─────────────── */}
      <section id="weather" style={snap} className="relative min-h-screen md:h-screen md:overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-[#0f1629] to-[#111d3a]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <SlideContent>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="aspect-[4/3] w-full relative rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/presentation/weather.png" alt="SnowManager Weather Forecast" fill className="object-cover" />
              </div>
            </FadeIn>

            <div>
              <FadeIn delay={100}>
                <p className="text-primary-300 font-semibold text-base uppercase tracking-wider mb-3">Live Weather Forecast</p>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                  Always know when to deploy
                </h2>
                <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                  Built-in weather forecasting gives you the data you need to make smart decisions. Know exactly when snow, ice, or frost is coming — and plan your response before it hits.
                </p>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="space-y-4">
                  {[
                    { title: 'Hyperlocal forecasts', desc: 'Weather data specific to each of your service areas.' },
                    { title: 'Road temperature data', desc: 'Surface temperature readings to predict ice formation.' },
                    { title: 'Precipitation alerts', desc: 'Get notified ahead of time when snowfall is expected.' },
                    { title: 'Historical weather log', desc: 'Full documentation of conditions for dispute resolution.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
        </SlideContent>
      </section>

      {/* ── 8. MORE FEATURES ─────────────────────── */}
      <section id="more" style={snap} className="min-h-screen md:h-screen md:overflow-hidden bg-white">
        <SlideContent>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FadeIn>
            <p className="text-primary font-semibold text-base uppercase tracking-wider mb-3">And there&apos;s more</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6">
              Built to run your entire business
            </h2>
            <p className="text-gray-500 text-xl max-w-3xl mb-16">
              Beyond the core features, SnowManager includes everything you need to operate professionally and grow your business.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Automatic Invoicing', desc: 'Generate invoices from completed jobs with GPS-verified timestamps and photos as proof of service.', icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>) },
              { title: 'Mobile App', desc: 'Your field crews get a powerful app with one-tap clock in/out, turn-by-turn navigation, and photo capture.', icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>) },
              { title: 'Customer Dashboard', desc: 'Give clients a branded portal to view service history, track upcoming work, and access reports.', icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>) },
              { title: 'Photo Documentation', desc: 'Timestamped, geotagged photos attached to every job for proof of service.', icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>) },
              { title: 'Drawing & Measurement Tool', desc: 'Precisely map and measure service areas directly on satellite imagery for accurate pricing.', icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>) },
              { title: 'Reporting & Analytics', desc: 'Detailed reports on operations, revenue, and crew performance to help you grow.', icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>) },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="text-primary mb-4">{f.icon}</div>
                  <h3 className="font-heading font-bold text-xl text-dark mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        </SlideContent>
      </section>

      {/* ── 9. TRUSTED BY CONTRACTORS ─────────────── */}
      <section id="contractors" style={snap} className="relative min-h-screen md:h-screen md:overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-[#0f1629] to-[#111d3a]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <SlideContent>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <FadeIn>
            <p className="text-primary-300 font-semibold text-base uppercase tracking-wider mb-3">Trusted by the industry</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              100+ contractors use SnowManager
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
              From small local operators to Scandinavia&apos;s largest service companies — contractors of all sizes trust SnowManager to run their winter operations.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mb-16">
              {[
                { name: 'ISS', logo: '/presentation/logos/iss.png' },
                { name: 'Forenede Service', logo: '/presentation/logos/forenede.png' },
                { name: 'Vinterservice', logo: '/presentation/logos/vinterservice.png' },
              ].map((company, i) => (
                <div key={i} className="flex items-center justify-center h-16 sm:h-20">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={200}
                    height={80}
                    className="max-h-full w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { value: '100+', label: 'Active contractors' },
                { value: '10,000+', label: 'Locations managed' },
                { value: '3', label: 'Countries' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <p className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-gray-400 text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
        </SlideContent>
      </section>

      {/* ── 10. CONTACT ───────────────────────────── */}
      <section id="contact" style={snap} className="relative min-h-screen md:h-screen md:overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-[#0f1629] to-[#111d3a]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px]" />

        <SlideContent>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to streamline your operations?
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Let us show you how SnowManager can save you time, cut costs, and help you grow your business. Get in touch for a personal demo.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {[
                {
                  label: 'Email',
                  value: 'sebastian@snowmanager.com',
                  href: 'mailto:sebastian@snowmanager.com',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  ),
                },
                {
                  label: 'Phone',
                  value: '+45 32 33 05 20',
                  href: 'tel:+4532330520',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  ),
                },
                {
                  label: 'Website',
                  value: 'snowmanager.com',
                  href: 'https://www.snowmanager.com',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                  ),
                },
              ].map((contact, i) => (
                <a key={i} href={contact.href} className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {contact.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{contact.label}</p>
                    <p className="text-white font-medium text-base">{contact.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <a
              href="mailto:sebastian@snowmanager.com?subject=SnowManager%20Demo%20Request"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-btn text-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Request a demo
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
          </FadeIn>
        </div>
        </SlideContent>
      </section>
    </>
  );
}
