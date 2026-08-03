import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Journey', href: '#journey' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Projects', href: '#projects' },
  { name: 'Code Game', href: '#code-game' },
  { name: 'Connect', href: '#connect' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'top-3' : 'top-0'
        }`}
      >
        <div className={`section-padding max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? 'py-3 rounded-2xl glass-strong border border-cyan/15 shadow-[0_12px_50px_rgba(0,0,0,0.45)]'
            : 'py-6 bg-transparent'
        }`}>
          {/* Logo */}
          <a
            href="#"
            className="relative flex items-center gap-3 group"
            aria-label="Harshit Bhardwaj — back to top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="absolute -inset-2 rounded-xl bg-cyan/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src="/hb-logo.png"
              alt=""
              className="relative w-11 h-11 rounded-xl border border-cyan/20 shadow-[0_0_18px_rgba(0,240,255,0.18)] transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.35)]"
            />
            <span className="relative hidden sm:block leading-tight">
              <span className="block font-display text-xl tracking-[0.18em] text-white">HARSHIT</span>
              <span className="block font-mono text-[8px] tracking-[0.28em] text-cyan/70">FULL STACK DEV</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full border border-white/10 bg-white/[0.03]">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                aria-current={activeSection === link.href ? 'page' : undefined}
                className={`relative px-4 py-2 rounded-full font-body text-sm transition-all duration-300 group ${
                  activeSection === link.href
                    ? 'text-black bg-cyan shadow-[0_0_22px_rgba(0,240,255,0.35)]'
                    : 'text-white/65 hover:text-white hover:bg-white/[0.07]'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {activeSection !== link.href && (
                  <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-cyan transition-all duration-300 group-hover:w-1/2" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <button
              type="button"
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              aria-current={activeSection === link.href ? 'page' : undefined}
              className={`font-display text-3xl transition-all duration-300 ${
                activeSection === link.href ? 'text-cyan translate-x-2' : 'text-white hover:text-cyan'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
