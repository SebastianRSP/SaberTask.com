'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

/* ───────────────────────────────────────────
   Section definitions
   ─────────────────────────────────────────── */
const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'historie', label: 'Historie' },
  { id: 'loesning', label: 'Løsning' },
  { id: 'vaekst', label: 'Vækst' },
  { id: 'marked', label: 'Marked' },
  { id: 'konkurrence', label: 'Konkurrence' },
  { id: 'investering', label: 'Investering' },
  { id: 'kontakt', label: 'Kontakt' },
] as const;

/* ───────────────────────────────────────────
   Active section tracker
   ─────────────────────────────────────────── */
function useActiveSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) {
            best = entry;
          }
        }
        if (best) {
          const idx = els.indexOf(best.target as HTMLElement);
          if (idx !== -1) setActive(idx);
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7] },
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
   Pie chart SVG for investment breakdown
   ─────────────────────────────────────────── */
function InvestmentPieChart() {
  const segments = [
    { label: 'Platform-udvikling', value: 180, color: '#4462F8', pct: '24%' },
    { label: 'Marketing & salg', value: 175, color: '#6B83FA', pct: '23.3%' },
    { label: 'Løn & team', value: 175, color: '#96A8F9', pct: '23.3%' },
    { label: 'Buffer / drift', value: 50, color: '#B9C5FB', pct: '6.7%' },
  ];

  const total = 580;
  const radius = 80;
  const cx = 100;
  const cy = 100;
  let cumulative = 0;

  function polarToCartesian(angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      <svg viewBox="0 0 200 200" className="w-56 h-56 lg:w-64 lg:h-64 flex-shrink-0">
        {segments.map((seg, i) => {
          const angle = (seg.value / total) * 360;
          const start = polarToCartesian(cumulative);
          const end = polarToCartesian(cumulative + angle);
          const largeArc = angle > 180 ? 1 : 0;
          const d = `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
          cumulative += angle;
          return <path key={i} d={d} fill={seg.color} stroke="white" strokeWidth="2" />;
        })}
        <circle cx={cx} cy={cy} r="40" fill="white" />
        <text x={cx} y={cy - 6} textAnchor="middle" className="text-xs fill-gray-500 font-body">Total</text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="text-sm fill-dark font-heading font-bold">580K EUR</text>
      </svg>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-sm mt-0.5 flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <div>
              <p className="font-semibold text-dark text-lg">{seg.label}</p>
              <p className="text-base text-gray-500">{seg.value.toLocaleString('da-DK')}K EUR ({seg.pct})</p>
            </div>
          </div>
        ))}
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
          <Image src="/icon.png" alt="WinterManager" width={32} height={32} className="w-8 h-8" />
          <span className="font-heading font-bold text-lg text-dark">WinterManager</span>
        </a>
        <a
          href="#kontakt"
          onClick={(e) => { e.preventDefault(); scrollToSection(SECTIONS.length - 1); }}
          className="bg-primary text-white px-5 py-2 rounded-btn text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          Kontakt os
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
      {/* Up arrow */}
      <button
        onClick={() => scrollToSection(active - 1)}
        disabled={isFirst}
        aria-label="Forrige sektion"
        className={`w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center transition-all duration-200 ${
          isFirst
            ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white/60'
            : 'border-gray-300 text-gray-600 hover:bg-primary hover:text-white hover:border-primary bg-white/80 shadow-sm cursor-pointer'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
      </button>

      {/* Dots */}
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
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-2 py-1 bg-dark text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {section.label}
            </span>
          </button>
        ))}
      </div>

      {/* Down arrow */}
      <button
        onClick={() => scrollToSection(active + 1)}
        disabled={isLast}
        aria-label="Næste sektion"
        className={`w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center transition-all duration-200 ${
          isLast
            ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white/60'
            : 'border-gray-300 text-gray-600 hover:bg-primary hover:text-white hover:border-primary bg-white/80 shadow-sm cursor-pointer'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {/* Section counter */}
      <span className="text-[10px] text-gray-400 font-mono tabular-nums">
        {active + 1}/{SECTIONS.length}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function InvestPage() {
  const active = useActiveSection();

  // Set up scroll-snap on document + keyboard nav
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = 'y proximity';
    html.style.scrollBehavior = 'smooth';

    return () => {
      html.style.scrollSnapType = '';
      html.style.scrollBehavior = '';
    };
  }, []);

  // Keyboard navigation
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

  /* shared snap style for every <section> */
  const snap: React.CSSProperties = { scrollSnapAlign: 'start' };

  return (
    <>
      <Nav />
      <SectionNav active={active} />

      {/* ── 1. HERO ────────────────────────────── */}
      <section id="hero" style={snap} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-dark via-[#0f1629] to-[#111d3a]">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <FadeIn delay={100}>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Vi digitaliserer<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-100">glatførebekæmpelse</span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              WinterManager er en alt-i-én SaaS-platform til glatførebekæmpelse.
              Vi erstatter telefonopkald, papirfakturaer og Excel-ark med én intelligent platform.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <button
              onClick={() => scrollToSection(SECTIONS.length - 1)}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-btn text-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Kontakt os
              <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </FadeIn>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-gray-500 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── 2. VORES HISTORIE ──────────────────── */}
      <section id="historie" style={snap} className="min-h-screen flex flex-col justify-center section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-primary font-semibold text-base uppercase tracking-wider mb-3">Vores historie</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6">
              Født ud af frustration — bygget indefra branchen
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100 mb-10">
              <p className="text-gray-600 text-xl leading-relaxed mb-4">
                Martin har 20+ års erfaring i snerydning og glatførebekæmpelse. I alle de år kæmpede han med de
                samme problemer: manuelle udkald kl. 3 om natten, håndskrevne fakturaer, og forældede systemer
                som Vinterman og Vejdirektoratets løsninger.
              </p>
              <p className="text-gray-600 text-xl leading-relaxed mb-4">
                Han bragte Sebastian ind i sin virksomhed for at opleve problemerne på egen hånd. Sebastian
                så hurtigt, at hele branchen manglede ét samlet digitalt værktøj — og begyndte at bygge
                platformen indefra virksomheden, med direkte adgang til de daglige frustrationer.
              </p>
            </div>
          </FadeIn>

          {/* Founder cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Sebastian Søe',
                role: 'Teknisk co-founder',
                bio: 'Byggede WinterManager-platformen fra bunden. Startede i Martins virksomhed for at forstå branchens problemer med egne øjne, og begyndte derefter at bygge løsningen. Har arbejdet med software og e-commerce siden han var 16 år gammel.',
                initials: 'SS',
                photo: '/sebastian.png',
              },
              {
                name: 'Martin Thorius',
                role: 'Brancheekspert & co-founder',
                bio: '20+ års erfaring i snerydning og glatførebekæmpelse. Martins dybtgående branchekendskab og netværk er fundamentet for WinterManagers produkt og go-to-market strategi.',
                initials: 'MT',
                photo: '/martin.png',
              },
            ].map((person, i) => (
              <FadeIn key={i} delay={200 + i * 100}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="aspect-[4/3] relative bg-gray-100">
                    {person.photo ? (
                      <Image src={person.photo} alt={person.name} fill className="object-cover object-center" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white text-5xl font-bold">
                        {person.initials}
                      </div>
                    )}
                  </div>
                  <div className="p-7">
                    <h3 className="font-heading font-bold text-xl text-dark">{person.name}</h3>
                    <p className="text-primary font-medium text-base mb-3">{person.role}</p>
                    <p className="text-gray-600 leading-relaxed">{person.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. LØSNINGEN ───────────────────────── */}
      <section id="loesning" style={snap} className="min-h-screen flex flex-col justify-center section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-primary font-semibold text-base uppercase tracking-wider mb-3">Løsningen</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6">
              Én platform til hele glatførebranchen
            </h2>
            <p className="text-gray-500 text-xl max-w-3xl mb-16">
              WinterManager samler ruteoptimering, fakturering, chauffør-koordinering, underleverandør-samarbejde
              og dokumentation i ét system — bygget specifikt til branchens behov.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { title: 'Automatisk ruteoptimering', desc: 'Intelligente ruter der minimerer køretid og maksimerer dækning.', icon: '🗺️' },
              { title: 'Fakturering på autopilot', desc: 'Automatisk fakturering baseret på udført arbejde. Integration til e-conomic, Navision m.m.', icon: '📄' },
              { title: 'Live chauffør-overblik', desc: 'Se alle chauffører i realtid. GPS-tracking, statusopdateringer og kommunikation.', icon: '📍' },
              { title: 'Underleverandør-samarbejde', desc: 'Del opgaver med underleverandører direkte i platformen. Fuld sporbarhed.', icon: '🤝' },
              { title: 'Tegneværktøj til måling', desc: 'Præcis opmåling og prissætning af arealer direkte på kortet.', icon: '📐' },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <span className="text-3xl mb-4 block">{f.icon}</span>
                  <h3 className="font-heading font-bold text-xl text-dark mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Key metrics */}
          <FadeIn>
            <div className="bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-8 md:p-12">
              <div className="grid sm:grid-cols-3 gap-8 text-center">
                {[
                  { value: '70%', label: 'Mindre kontorarbejde' },
                  { value: '85%', label: 'Mindre tid på fakturering' },
                  { value: '30%', label: 'Lavere driftsomkostninger' },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                    <p className="text-primary-100 text-base font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* ── 4. VÆKST ───────────────────────────── */}
      <section id="vaekst" style={snap} className="relative min-h-screen overflow-hidden">
        {/* Dark background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-[#0f1629] to-[#111d3a]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <FadeIn>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-16">
              Traction og vækst
            </h2>
          </FadeIn>

          {/* Revenue growth — hero stat */}
          <FadeIn delay={100}>
            <div className="relative bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 mb-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <p className="text-primary-300 font-medium text-base uppercase tracking-wider mb-4">Revenue-vækst denne sæson</p>
                  <div className="flex items-baseline gap-4 justify-center md:justify-start flex-wrap">
                    <span className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-white">10x</span>
                    <span className="text-gray-400 text-xl">vækst</span>
                  </div>
                  <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
                    <span className="text-gray-400 text-xl">80.000 DKK</span>
                    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    <span className="text-white text-xl font-semibold">800.000 DKK</span>
                  </div>
                  <p className="text-gray-500 text-base mt-2">Sidste sæson → denne sæson (forventet)</p>
                </div>
                {/* Growth bar visual */}
                <div className="flex items-end gap-3 h-40">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 bg-primary/30 rounded-t-lg" style={{ height: '20px' }} />
                    <span className="text-sm text-gray-500">2024/25</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 bg-gradient-to-t from-primary to-primary-300 rounded-t-lg" style={{ height: '140px' }} />
                    <span className="text-sm text-gray-400">2025/26</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Key traction stats */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { value: '54 af 98', label: 'kommuner søger nye løsninger', desc: 'Vi har ringet til alle 98 kommuner i Danmark' },
              { value: '100+', label: 'underleverandører på platformen', desc: 'Med egne adresser og/eller arbejder for andre virksomheder' },
              { value: 'ISS', label: 'stor enterprise-kunde', desc: 'ISS er skiftet fra Vinterman til WinterManager' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={200 + i * 100}>
                <div className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-7 text-center h-full">
                  <p className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-primary-200 font-medium text-lg mb-2">{stat.label}</p>
                  <p className="text-gray-500 text-base">{stat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Network effect flywheel */}
          <FadeIn delay={500}>
            <div className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-7 md:p-10">
              <h3 className="font-heading font-bold text-2xl text-white mb-2 text-center">Netværkseffekt — vores vækst-flywheel</h3>
              <p className="text-gray-400 text-base text-center mb-8 max-w-xl mx-auto">
                Hver ny kunde udløser en kaskade af nye betalende brugere — uden ekstra salgsomkostninger.
              </p>

              {/* Flywheel SVG */}
              <div className="flex justify-center mb-8">
                <svg viewBox="0 0 520 340" className="w-full max-w-lg" fill="none">
                  <defs>
                    <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <path d="M0 0L8 3L0 6Z" fill="#4462F8" />
                    </marker>
                  </defs>

                  {/* Arrow: Kommune → Leverandører (top) */}
                  <path d="M170 80 Q260 30 350 80" stroke="#4462F8" strokeWidth="2.5" fill="none" markerEnd="url(#arrowBlue)" strokeDasharray="6 3" />
                  {/* Arrow: Leverandører → Deres kunder (right) */}
                  <path d="M420 130 Q460 190 420 250" stroke="#4462F8" strokeWidth="2.5" fill="none" markerEnd="url(#arrowBlue)" strokeDasharray="6 3" />
                  {/* Arrow: Deres kunder → Nye kunder (bottom) */}
                  <path d="M350 290 Q260 330 170 290" stroke="#4462F8" strokeWidth="2.5" fill="none" markerEnd="url(#arrowBlue)" strokeDasharray="6 3" />
                  {/* Arrow: Nye kunder → Kommune (left) */}
                  <path d="M100 250 Q60 190 100 130" stroke="#4462F8" strokeWidth="2.5" fill="none" markerEnd="url(#arrowBlue)" strokeDasharray="6 3" />

                  {/* Node 1: Kommune / Kunde */}
                  <rect x="50" y="70" width="160" height="64" rx="16" fill="rgba(255,255,255,0.05)" stroke="#4462F8" strokeWidth="2" />
                  <text x="130" y="96" textAnchor="middle" className="text-[13px] font-heading font-bold fill-white">Kommune / Kunde</text>
                  <text x="130" y="118" textAnchor="middle" className="text-[11px] fill-gray-400">onboarder på platformen</text>

                  {/* Node 2: Leverandører */}
                  <rect x="310" y="70" width="160" height="64" rx="16" fill="rgba(255,255,255,0.05)" stroke="#4462F8" strokeWidth="2" />
                  <text x="390" y="96" textAnchor="middle" className="text-[13px] font-heading font-bold fill-white">Leverandører</text>
                  <text x="390" y="118" textAnchor="middle" className="text-[11px] fill-gray-400">inviteres af kommunen</text>

                  {/* Node 3: Leverandørens kunder */}
                  <rect x="310" y="240" width="160" height="64" rx="16" fill="rgba(255,255,255,0.05)" stroke="#4462F8" strokeWidth="2" />
                  <text x="390" y="266" textAnchor="middle" className="text-[13px] font-heading font-bold fill-white">Deres egne kunder</text>
                  <text x="390" y="288" textAnchor="middle" className="text-[11px] fill-gray-400">onboardes af leverandøren</text>

                  {/* Node 4: Nye betalende brugere */}
                  <rect x="50" y="240" width="160" height="64" rx="16" fill="#4462F8" stroke="#4462F8" strokeWidth="2" />
                  <text x="130" y="266" textAnchor="middle" className="text-[13px] font-heading font-bold fill-white">Nye betalende brugere</text>
                  <text x="130" y="288" textAnchor="middle" className="text-[11px] fill-primary-200">bliver selv kunder</text>

                  {/* Center label */}
                  <text x="260" y="178" textAnchor="middle" className="text-[11px] font-heading font-semibold fill-primary-300">FLYWHEEL</text>
                </svg>
              </div>

              <p className="text-gray-400 text-base leading-relaxed text-center max-w-2xl mx-auto">
                Kommuner bringer deres leverandører med ind på platformen. Leverandørerne har egne kunder og adresser,
                som de også begynder at administrere i WinterManager. Disse kunder har igen egne leverandører — og cyklussen gentager sig.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 5. MARKEDSMULIGHED (TAM / SAM / SOM) ── */}
      <section id="marked" style={snap} className="min-h-screen flex flex-col justify-center section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-primary font-semibold text-base uppercase tracking-wider mb-3">Markedsmulighed</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6">
              Stort, fragmenteret og underdigitaliseret
            </h2>
            <p className="text-gray-500 text-xl max-w-3xl mb-12">
              Glatførebekæmpelse er et globalt milliardmarked med ekstrem fragmentering — og ingen markedsdominerende software-løsninger.
            </p>
          </FadeIn>

          {/* TAM / SAM / SOM concentric circles + detail cards */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 mb-12">
            {/* Concentric circle SVG */}
            <FadeIn delay={100}>
              <div className="flex-shrink-0">
                <svg viewBox="0 0 420 420" className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  {/* TAM — outer */}
                  <circle cx="210" cy="210" r="195" fill="#4462F8" opacity="0.08" stroke="#4462F8" strokeWidth="2" />
                  <text x="210" y="52" textAnchor="middle" className="text-[13px] font-heading font-bold fill-primary">TAM</text>
                  <text x="210" y="72" textAnchor="middle" className="text-[18px] font-heading font-bold fill-dark">€76 mia.</text>

                  {/* SAM — middle */}
                  <circle cx="210" cy="235" r="125" fill="#4462F8" opacity="0.12" stroke="#4462F8" strokeWidth="2" />
                  <text x="210" y="148" textAnchor="middle" className="text-[13px] font-heading font-bold fill-primary">SAM</text>
                  <text x="210" y="168" textAnchor="middle" className="text-[18px] font-heading font-bold fill-dark">€370-550 mio.</text>

                  {/* SOM — inner */}
                  <circle cx="210" cy="280" r="60" fill="#4462F8" opacity="0.2" stroke="#4462F8" strokeWidth="2.5" />
                  <text x="210" y="270" textAnchor="middle" className="text-[11px] font-heading font-bold fill-primary">SOM</text>
                  <text x="210" y="292" textAnchor="middle" className="text-[16px] font-heading font-bold fill-dark">€2-8 mio.</text>
                </svg>
              </div>
            </FadeIn>

            {/* Detail cards */}
            <div className="flex-1 space-y-5">
              <FadeIn delay={200}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-xs font-bold text-white bg-primary rounded px-2 py-0.5">TAM</span>
                    <h3 className="font-heading font-bold text-xl text-dark">Globalt glatførebekæmpelsesmarked</h3>
                  </div>
                  <p className="font-heading text-2xl font-bold text-primary mb-2">€76 mia. (2024) → €115-120 mia. (2032)</p>
                  <ul className="space-y-1.5 text-gray-600 text-base">
                    <li className="flex items-start gap-2"><span className="text-primary mt-1.5">&#8226;</span>5,6% CAGR — Nordamerika 40% (€25 mia.), Europa 28% (€20-23 mia.)</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1.5">&#8226;</span>88.200+ operatører i USA alene (€19 mia. omsætning)</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1.5">&#8226;</span>Ekstremt fragmenteret: top 4 har kun 5% markedsandel, 80% er enkeltmandsvirksomheder</li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-xs font-bold text-white bg-primary/70 rounded px-2 py-0.5">SAM</span>
                    <h3 className="font-heading font-bold text-xl text-dark">Software til glatførebekæmpelse</h3>
                  </div>
                  <p className="font-heading text-2xl font-bold text-primary mb-2">€370-550 mio.</p>
                  <ul className="space-y-1.5 text-gray-600 text-base">
                    <li className="flex items-start gap-2"><span className="text-primary mt-1.5">&#8226;</span>~€18 mia. globalt servicemarked × 2-3% IT-spend = €370-550 mio.</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1.5">&#8226;</span>FSM-software: €4,7-5 mia. (12-16% CAGR) / Ruteoptimering: €7-10 mia. (14,5% CAGR)</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1.5">&#8226;</span>Branchen bruger kun 1-2% af omsætning på IT vs. 5% gennemsnit — kæmpe digitaliseringsgab</li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={400}>
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-xs font-bold text-white bg-primary rounded px-2 py-0.5">SOM</span>
                    <h3 className="font-heading font-bold text-xl text-dark">Norden + tidlig international (3-5 år)</h3>
                  </div>
                  <p className="font-heading text-2xl font-bold text-primary mb-2">€2-8 mio. ARR → €20-50 mio. med fuld ekspansion</p>
                  <ul className="space-y-1.5 text-gray-600 text-base">
                    <li className="flex items-start gap-2"><span className="text-primary mt-1.5">&#8226;</span>DK: 98 kommuner + 500-1.500 private udbydere (€107-160 mio./år i vinterdrift)</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1.5">&#8226;</span>Norden: 1.054 kommuner (DK 98, SE 290, NO 357, FI 309) — estimeret €2-4 mia. marked</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1.5">&#8226;</span>USA-mulighed via SIMA: 88.200 virksomheder, gns. €140.000 omsætning — ingen dominerende platform</li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Sources */}
          <FadeIn delay={500}>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Kilder:</p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
                <a href="https://market.us/report/snow-removal-market/" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary underline underline-offset-2">Market.us</a>
                <a href="https://turfmagazine.com/sima-industry-impact-report-average-snow-ice-revenue" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary underline underline-offset-2">SIMA Industry Report</a>
                <a href="https://www.equipmentworld.com/roadbuilding/article/14962965/23-state-dots-spent-more-than-1-billion-on-snow-ice-maintenance-this-winter" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary underline underline-offset-2">Equipment World</a>
                <a href="https://www.serviceautopilot.com/snow-removal/5-snow-removal-industry-statistics-and-trends-in-2023/" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary underline underline-offset-2">Service Autopilot</a>
                <a href="https://www.tv2kosmopol.dk/koebenhavn/kobenhavns-kommune-har-brugt-storstedelen-af-sit-vinterbudget-5da8d" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary underline underline-offset-2">TV2 Kosmopol</a>
                <a href="https://www.accel-kkr.com/accel-kkrs-duett-software-group-acquires-danish-software-company-skyhost/" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary underline underline-offset-2">Accel-KKR / Skyhost</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 6. KONKURRENCE ──────────────────────── */}
      <section id="konkurrence" style={snap} className="min-h-screen flex flex-col justify-center section-padding bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-primary font-semibold text-base uppercase tracking-wider mb-3">Konkurrence</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-12">
              Hvorfor WinterManager vinder
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <thead>
                  <tr className="bg-dark text-white text-left">
                    <th className="px-6 py-4 font-heading font-semibold text-base"></th>
                    <th className="px-6 py-4 font-heading font-semibold text-base">Vinterman (Vejdir.)</th>
                    <th className="px-6 py-4 font-heading font-semibold text-base">Skyhost</th>
                    <th className="px-6 py-4 font-heading font-semibold text-base text-primary-300">WinterManager</th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  {[
                    { feature: 'Moderne platform', v: false, s: '~', w: true },
                    { feature: 'Ruteoptimering', v: false, s: true, w: true },
                    { feature: 'Automatisk fakturering', v: false, s: false, w: true },
                    { feature: 'Underleverandør-lag', v: false, s: false, w: true },
                    { feature: 'Tegneprogram / opmåling', v: false, s: false, w: true },
                    { feature: 'GPS-tracking', v: false, s: true, w: true },
                    { feature: 'Regnskabsintegrationer', v: false, s: false, w: true },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3.5 font-medium text-dark">{row.feature}</td>
                      {[row.v, row.s, row.w].map((val, j) => (
                        <td key={j} className={`px-6 py-3.5 ${j === 2 ? 'font-semibold' : ''}`}>
                          {val === true ? (
                            <svg className={`w-5 h-5 ${j === 2 ? 'text-green-500' : 'text-green-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          ) : val === false ? (
                            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          ) : (
                            <span className="text-yellow-500 font-medium">Delvist</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-8 bg-primary/5 border border-primary/10 rounded-2xl p-7">
              <h3 className="font-heading font-bold text-xl text-dark mb-3">Vores unikke fordel</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                WinterManager er den eneste alt-i-én platform med underleverandør-samarbejde, tegneprogram til opmåling,
                automatisk fakturering og gratis integrationer til kunders regnskabssystemer (e-conomic, Navision m.m.).
                ISS — en af landets største leverandører — er allerede skiftet fra Vinterman til os.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 7. INVESTERINGEN ───────────────────── */}
      <section id="investering" style={snap} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-[#0f1629] to-[#111d3a]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <FadeIn>
            <p className="text-primary-300 font-semibold text-base uppercase tracking-wider mb-3">Investeringen</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Vi søger 580.000 EUR
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="bg-white rounded-3xl p-8 md:p-12 mb-10">
              <InvestmentPieChart />
            </div>
          </FadeIn>

          {/* Breakdown cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Platform-udvikling', amount: '180K EUR', desc: 'Genopbygning, skalerbarhed, enterprise features, GPS-tracking', color: '#4462F8' },
              { title: 'Marketing & salg', amount: '175K EUR', desc: 'SIMA konference i USA, cold outreach, digital markedsføring', color: '#6B83FA' },
              { title: 'Løn & team', amount: '175K EUR', desc: 'Projektleder i nye markeder, support og salg', color: '#96A8F9' },
              { title: 'Buffer / drift', amount: '50K EUR', desc: 'Driftsomkostninger og uforudsete udgifter', color: '#B9C5FB' },
            ].map((card, i) => (
              <FadeIn key={i} delay={200 + i * 80}>
                <div className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
                  <div className="w-3 h-3 rounded-sm mb-4" style={{ backgroundColor: card.color }} />
                  <p className="font-heading font-bold text-2xl text-white mb-1">{card.amount}</p>
                  <p className="text-primary-200 font-medium text-base mb-2">{card.title}</p>
                  <p className="text-gray-500 text-base leading-relaxed">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Roadmap highlights */}
          <FadeIn delay={600}>
            <div className="mt-10 bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-7 md:p-10">
              <h3 className="font-heading font-bold text-2xl text-white mb-5">Hvad pengene skal bruges til</h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { period: 'Nu — Aug 2025', text: 'Platform-genopbygning: skalerbar arkitektur, enterprise login (Azure AD), mobilapp med GPS' },
                  { period: 'Sep — Dec 2025', text: 'Kommunal ekspansion: onboarde 54 interesserede kommuner og deres leverandørnetværk' },
                  { period: '2025 — 2026', text: 'SIMA konference i USA + international cold outreach i nordamerikanske markeder' },
                  { period: 'Løbende', text: 'Salg, support og marketing til at understøtte væksten' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-300 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-primary-300 text-sm font-semibold uppercase tracking-wider">{item.period}</span>
                      <p className="text-gray-300 text-base leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 8. KONTAKT ─────────────────────────── */}
      <section id="kontakt" style={snap} className="min-h-screen flex flex-col justify-center section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-primary font-semibold text-base uppercase tracking-wider mb-3">Kontakt</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-4">
              Klar til at høre mere?
            </h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto mb-10">
              Vi vil gerne fortælle mere om WinterManager og vores vision. Tag fat i os — vi svarer hurtigt.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 mb-10">
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
                    label: 'Telefon',
                    value: '+45 42 53 32 22',
                    href: 'tel:+4542533222',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    ),
                  },
                  {
                    label: 'Hjemmeside',
                    value: 'wintermanager.dk',
                    href: 'https://wintermanager.dk',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                    ),
                  },
                ].map((contact, i) => (
                  <a key={i} href={contact.href} className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white transition-colors group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {contact.icon}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">{contact.label}</p>
                      <p className="text-dark font-medium text-base">{contact.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <a
                href="mailto:sebastian@snowmanager.com?subject=Investormulighed%20-%20WinterManager"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-btn text-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Kontakt os
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-gray-400 text-base">
              Denne side er fortrolig og kun delt med udvalgte investorer.
            </p>
          </FadeIn>
        </div>

        {/* Embedded footer */}
        <div className="mt-auto pt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100 pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/icon.png" alt="WinterManager" width={24} height={24} className="w-6 h-6" />
              <span className="text-gray-400 text-sm">WinterManager</span>
            </div>
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} WinterManager. Alle rettigheder forbeholdes.</p>
          </div>
        </div>
      </section>
    </>
  );
}
