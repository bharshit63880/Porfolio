import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ExternalLink, Github, Cpu, ShoppingCart, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'AllSpark',
    subtitle: 'Online Coding & Evaluation Platform',
    description: 'A distributed coding ecosystem where independent services handle identity, problems, submissions, contests, permissions, support and live leaderboards behind a shared API gateway.',
    highlights: ['Judge0 code execution', 'Kafka domain events', 'Redis live state', 'OTP auth & RBAC'],
    status: 'Dockerized local platform',
    image: '/project-allspark-real.png',
    tech: ['Microservices', 'Kafka', 'Docker', 'Redis', 'Judge0'],
    icon: Cpu,
    color: 'cyan',
    link: null,
    github: 'https://github.com/bharshit63880/AllSpark',
  },
  {
    id: 2,
    title: 'Sastify',
    subtitle: 'Commerce, Checkout & Admin Platform',
    description: 'A complete marketplace workflow spanning customer identity, guest-cart sync, addresses, coupons, inventory-aware checkout, payment verification and protected administration.',
    highlights: ['PayU / Razorpay flows', 'Idempotent verification', 'Ownership-scoped APIs', 'Role-protected admin'],
    status: 'Live frontend deployment',
    image: '/project-sastify-real.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    icon: ShoppingCart,
    color: 'pink',
    link: 'https://sastify-frontend.vercel.app',
    github: 'https://github.com/bharshit63880/Sastify',
  },
  {
    id: 3,
    title: 'PulseChat',
    subtitle: 'Private Real-Time Messaging Workspace',
    description: 'A security-focused messaging monorepo where direct-message text and media are encrypted in the browser before transport, backed by device-aware sessions and real-time delivery.',
    highlights: ['Browser-side encryption', 'Rotating device sessions', 'Presence & seen states', 'Offline outbox retry'],
    status: 'Live web deployment',
    image: '/project-pulse-real.png',
    tech: ['TypeScript', 'Socket.io', 'E2E Encryption', 'WebSocket', 'Node.js'],
    icon: MessageSquare,
    color: 'purple',
    link: 'https://pulsechat-web-rose.vercel.app',
    github: 'https://github.com/bharshit63880/PULSECHAT',
  },
  {
    id: 4,
    title: 'DigiPandit',
    subtitle: 'Spiritual Services, Guidance & Commerce',
    description: 'A Hindi-first multi-domain platform combining expert discovery, service bookings, Kundali experiences, guided Hawans, puja commerce and role-aware dashboards.',
    highlights: ['Booking workflows', 'Guided Hawan engine', 'Store & PayU checkout', 'Multi-role dashboards'],
    status: 'Live web & REST API',
    image: '/project-digipandit-real.png',
    tech: ['React Native', 'Razorpay', 'Real-time Chat', 'Node.js', 'MongoDB'],
    icon: Sparkles,
    color: 'cyan',
    link: 'https://digipandit-web.vercel.app',
    github: 'https://github.com/bharshit63880/DIGIPANDIT',
  },
  {
    id: 5,
    title: 'SatyaShield',
    subtitle: 'Privacy-First Case Coordination Platform',
    description: 'A sensitive-workflow system built around identity-minimized reporting, one-time case access, encrypted evidence and exact-resource authorization for reporters, NGOs, investigators and administrators.',
    image: '/project-satyashield-real.png',
    tech: ['React', 'Node.js', 'AES-GCM', 'TOTP MFA', 'Socket.IO'],
    highlights: ['Encrypted evidence vault', 'Case-level permissions', 'Realtime coordination', 'Safety triage & audit'],
    status: 'Public evaluation demo',
    icon: ShieldCheck,
    color: 'purple',
    link: 'https://satya-shield-client.vercel.app',
    github: 'https://github.com/bharshit63880/SatyaShield',
  },
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      className={`transform-gpu transition-transform duration-200 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-0 w-72 h-72 bg-purple/5 rounded-full blur-3xl" />

      <div className="relative z-10 section-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="font-mono text-cyan text-sm tracking-widest mb-4 block">
            &lt;Portfolio /&gt;
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            FEATURED <span className="gradient-text">PROJECTS</span>
          </h2>
          <p className="font-body text-white/60 max-w-xl mx-auto">
            A showcase of my best work, built with passion and precision
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => {
            const Icon = project.icon;
            const isHovered = hoveredProject === project.id;
            
            return (
              <div
                key={project.id}
                className={`transition-all duration-700 ${project.id === 5 ? 'md:col-span-2' : ''} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <TiltCard className="h-full">
                  <div className={`relative group h-full rounded-2xl overflow-hidden glass border border-white/10 hover:border-cyan/30 transition-all duration-500 ${project.id === 5 ? 'lg:grid lg:grid-cols-[1.05fr_1fr]' : 'flex flex-col'}`}>
                    {/* Image Container */}
                    <div className={`relative overflow-hidden ${project.id === 5 ? 'h-64 lg:h-full lg:min-h-[520px]' : 'h-56 sm:h-64'}`}>
                      <img
                        src={project.image}
                        alt={`${project.title} application preview`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      
                      {/* Project Icon */}
                      <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-${project.color}/20 backdrop-blur-sm flex items-center justify-center border border-${project.color}/30`}>
                        <Icon size={24} className={`text-${project.color}`} />
                      </div>
                      
                      {/* Links */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code on GitHub`}
                          title="View source code"
                          className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <Github size={18} />
                        </a>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title} live website`}
                            title="Open live website"
                            className="w-10 h-10 rounded-lg bg-cyan/20 backdrop-blur-sm flex items-center justify-center hover:bg-cyan/40 transition-colors"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1">
                      {/* Title */}
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-cyan transition-colors">
                        {project.title}
                      </h3>
                      <p className={`font-mono text-sm text-${project.color} mb-3`}>
                        {project.subtitle}
                      </p>
                      
                      {/* Description */}
                      <p className="font-body text-white/65 text-sm leading-6 mb-5">
                        {project.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-2 mb-5">
                        {project.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-start gap-2 text-xs text-white/70">
                            <CheckCircle2 size={14} className={`mt-0.5 shrink-0 text-${project.color}`} />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 mb-5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-white/55">
                        <span className={`w-1.5 h-1.5 rounded-full bg-${project.color} animate-pulse`} />
                        {project.status}
                      </div>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 text-xs font-mono rounded bg-${project.color}/10 text-${project.color} border border-${project.color}/20`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex flex-wrap gap-3 pt-5 border-t border-white/10">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-sm"
                        >
                          <Github size={16} /> Source Code
                        </a>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan/10 border border-cyan/25 hover:border-cyan/60 hover:bg-cyan/20 transition-all text-sm text-cyan"
                          >
                            <ExternalLink size={16} /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Bottom Glow */}
                    <div 
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${project.color} to-transparent transition-all duration-500 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`} 
                    />
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* View More */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="https://github.com/bharshit63880"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/20 hover:border-cyan/50 transition-all duration-300 group"
          >
            <Github size={18} />
            <span className="font-body text-sm">View More on GitHub</span>
            <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </section>
  );
}
