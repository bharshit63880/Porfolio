import { useEffect, useState } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { Journey } from './sections/Journey';
import { Expertise } from './sections/Expertise';
import { Projects } from './sections/Projects';
import { Connect } from './sections/Connect';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          {/* Loading Animation */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan/20 animate-spin" style={{ animationDuration: '3s' }} />
            
            {/* Middle Ring */}
            <div className="absolute inset-2 rounded-full border-2 border-purple/30 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
            
            {/* Inner Ring */}
            <div className="absolute inset-4 rounded-full border-2 border-pink/40 animate-spin" style={{ animationDuration: '1.5s' }} />
            
            {/* Center */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-black">HB</span>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="font-mono text-cyan text-sm animate-pulse">
            &lt;Loading Portfolio /&gt;
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-cyan via-purple to-pink animate-pulse"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
        <div 
          className="h-full bg-gradient-to-r from-cyan via-purple to-pink transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Journey />
        <Expertise />
        <Projects />
        <Connect />
      </main>

      {/* Custom Cursor Effect (Desktop Only) */}
      <CustomCursor />
    </div>
  );
}

// Custom Cursor Component
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [role="button"]');
      setIsHovering(!!isHoverable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main Cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-transform duration-100 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div 
          className={`w-4 h-4 rounded-full border border-cyan transition-all duration-200 ${
            isHovering ? 'bg-cyan/30' : 'bg-transparent'
          }`}
        />
      </div>
      
      {/* Trailing Cursor */}
      <div
        className={`fixed pointer-events-none z-[9998] transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 0.5})`,
        }}
      >
        <div className="w-8 h-8 rounded-full border border-purple/30" />
      </div>
    </>
  );
}

export default App;
