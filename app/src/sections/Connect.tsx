import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Phone, Send, MapPin, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/bharshit63880',
    color: 'cyan',
    handle: '@bharshit63880',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/harshit-bhardwaj-125324287',
    color: 'blue',
    handle: 'Harshit Bhardwaj',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:bharshit63880@gmail.com',
    color: 'pink',
    handle: 'bharshit63880@gmail.com',
  },
  {
    name: 'Phone',
    icon: Phone,
    url: 'tel:+916388063900',
    color: 'purple',
    handle: '+91 6388063900',
  },
];

interface FloatingIconProps {
  link: typeof socialLinks[0];
  index: number;
}

function FloatingIcon({ link, index }: FloatingIconProps) {
  const Icon = link.icon;
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = () => {
    // Create explosion particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.cos((i / 12) * Math.PI * 2) * 50,
      y: Math.sin((i / 12) * Math.PI * 2) * 50,
    }));
    setParticles(newParticles);
    
    // Clear particles after animation
    setTimeout(() => setParticles([]), 600);
    
    // Open link
    window.open(link.url, '_blank');
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-2 h-2 rounded-full bg-${link.color} pointer-events-none`}
          style={{
            top: '50%',
            left: '50%',
            animation: 'particle-explode 0.6s ease-out forwards',
            transform: `translate(-50%, -50%)`,
            '--tx': `${particle.x}px`,
            '--ty': `${particle.y}px`,
          } as React.CSSProperties}
        />
      ))}
      
      {/* Icon Button */}
      <button
        onClick={handleClick}
        className={`relative w-20 h-20 rounded-2xl glass flex items-center justify-center transition-all duration-500 group ${
          isHovered ? `border-${link.color} shadow-glow` : 'border-white/10'
        }`}
        style={{
          animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
          animationDelay: `${index * 0.2}s`,
        }}
      >
        {/* Glow Background */}
        <div className={`absolute inset-0 rounded-2xl bg-${link.color}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
        
        {/* Icon */}
        <Icon 
          size={32} 
          className={`relative z-10 text-white group-hover:text-${link.color} transition-colors duration-300`}
        />
        
        {/* Ring Effect */}
        <div className={`absolute inset-0 rounded-2xl border-2 border-${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110 group-hover:scale-100`} />
      </button>
      
      {/* Label */}
      <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}>
        <span className="font-mono text-xs text-white/60">{link.handle}</span>
      </div>
    </div>
  );
}

export function Connect() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

      <div className="relative z-10 section-padding max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="font-mono text-pink text-sm tracking-widest mb-4 block">
            &lt;Contact /&gt;
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            LET&apos;S <span className="gradient-text">CONNECT</span>
          </h2>
          <p className="font-body text-white/60 max-w-xl mx-auto">
            Have a project in mind? Let&apos;s create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Social Links */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Floating Icons */}
            <div className="flex justify-center gap-6 mb-12">
              {socialLinks.map((link, index) => (
                <FloatingIcon key={link.name} link={link} index={index} />
              ))}
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl glass border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan/20 flex items-center justify-center">
                    <MapPin size={24} className="text-cyan" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-white">Location</h4>
                    <p className="font-body text-white/60">Jhansi, Uttar Pradesh, India</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl glass border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple/20 flex items-center justify-center">
                    <Mail size={24} className="text-purple" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-white">Email</h4>
                    <a 
                      href="mailto:bharshit63880@gmail.com"
                      className="font-body text-white/60 hover:text-cyan transition-colors flex items-center gap-1"
                    >
                      bharshit63880@gmail.com
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass border border-white/10">
              <h3 className="font-display text-2xl text-white mb-6">Send a Message</h3>
              
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block font-mono text-sm text-white/60 mb-2">
                    &lt;Name /&gt;
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cyan transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block font-mono text-sm text-white/60 mb-2">
                    &lt;Email /&gt;
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cyan transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block font-mono text-sm text-white/60 mb-2">
                    &lt;Message /&gt;
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cyan transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-cyber flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
                  ) : isSubmitted ? (
                    <>
                      <span className="text-green-400">Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} className="text-cyan" />
                      <span className="text-white">Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-24 pt-8 border-t border-white/10 text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-mono text-sm text-white/40">
            &lt;Built with passion by <span className="text-cyan">Harshit Bhardwaj</span> /&gt;
          </p>
          <p className="font-mono text-xs text-white/20 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>

      {/* Particle Explode Animation */}
      <style>{`
        @keyframes particle-explode {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
