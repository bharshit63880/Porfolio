import { useEffect, useRef, useState } from 'react';
import { Code2, Server, Database, Layers, Cloud, Shield, Zap } from 'lucide-react';

const expertiseData = [
  {
    id: '01',
    title: 'Full-Stack Development',
    description: 'Building complete web applications from frontend to backend with modern technologies and best practices.',
    skills: [
      { name: 'MERN Stack', icon: Layers },
      { name: 'React', icon: Code2 },
      { name: 'TypeScript', icon: Code2 },
      { name: 'Tailwind CSS', icon: Layers },
      { name: 'Material-UI', icon: Layers },
      { name: 'Redux', icon: Database },
    ],
    color: 'cyan',
    gradient: 'from-cyan to-blue-500',
  },
  {
    id: '02',
    title: 'Real-Time Systems & Microservices',
    description: 'Designing scalable distributed systems with real-time communication and containerized deployments.',
    skills: [
      { name: 'Docker', icon: Server },
      { name: 'Kafka', icon: Zap },
      { name: 'Redis', icon: Database },
      { name: 'Socket.io', icon: Zap },
      { name: 'WebSocket', icon: Zap },
      { name: 'JWT', icon: Shield },
      { name: 'Cloudinary', icon: Cloud },
    ],
    color: 'purple',
    gradient: 'from-purple to-pink',
  },
];

function Orb({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <div 
      className={`relative w-32 h-32 sm:w-48 sm:h-48 rounded-full transition-all duration-700 ${
        isHovered ? 'scale-110' : 'scale-100'
      }`}
    >
      {/* Outer Glow */}
      <div className={`absolute inset-0 rounded-full bg-${color} opacity-30 blur-3xl animate-pulse-glow`} />
      
      {/* Main Orb */}
      <div 
        className={`absolute inset-2 rounded-full bg-gradient-to-br ${
          color === 'cyan' 
            ? 'from-cyan via-blue-400 to-purple' 
            : 'from-purple via-pink to-cyan'
        } animate-spin-slow`}
        style={{
          boxShadow: isHovered 
            ? `0 0 60px ${color === 'cyan' ? '#00F0FF' : '#BD00FF'}, 0 0 120px ${color === 'cyan' ? '#00F0FF40' : '#BD00FF40'}`
            : `0 0 30px ${color === 'cyan' ? '#00F0FF60' : '#BD00FF60'}`,
        }}
      >
        {/* Inner Core */}
        <div className="absolute inset-4 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <span className={`font-display text-4xl sm:text-6xl font-bold text-${color} text-glow-${color}`}>
            {color === 'cyan' ? '01' : '02'}
          </span>
        </div>
      </div>
      
      {/* Orbiting Particles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 rounded-full bg-${color}`}
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${i * 120}deg) translateX(${isHovered ? 80 : 70}px)`,
            transition: 'transform 0.7s ease-out',
            boxShadow: `0 0 10px ${color === 'cyan' ? '#00F0FF' : '#BD00FF'}`,
          }}
        />
      ))}
    </div>
  );
}

export function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Floating Orbs Background */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-cyan/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-purple/5 blur-3xl" />

      <div className="relative z-10 section-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="font-mono text-purple text-sm tracking-widest mb-4 block">
            &lt;Skills /&gt;
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            MY <span className="gradient-text">EXPERTISE</span>
          </h2>
          <p className="font-body text-white/60 max-w-xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Expertise Cards */}
        <div className="space-y-24">
          {expertiseData.map((item, index) => (
            <div
              key={item.id}
              className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Orb - Left or Right based on index */}
              <div className={`flex justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Orb color={item.color} isHovered={hoveredIndex === index} />
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                {/* Number Badge */}
                <div className={`flex items-center gap-4 mb-6 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  <span className={`font-display text-6xl sm:text-7xl font-bold text-${item.color}/20`}>
                    {item.id}
                  </span>
                  <div className={`h-px flex-1 max-w-[100px] bg-gradient-to-r ${
                    index % 2 === 1 ? 'from-transparent to-' + item.color : 'from-' + item.color + ' to-transparent'
                  }`} />
                </div>

                {/* Title */}
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-body text-white/60 mb-8">
                  {item.description}
                </p>

                {/* Skills Grid */}
                <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${index % 2 === 1 ? 'lg:ml-auto' : ''}`}>
                  {item.skills.map((skill) => {
                    const SkillIcon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className={`group flex items-center gap-2 p-3 rounded-lg glass hover:border-${item.color}/50 transition-all duration-300 cursor-default`}
                      >
                        <SkillIcon 
                          size={18} 
                          className={`text-${item.color} group-hover:scale-110 transition-transform`} 
                        />
                        <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-24 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan" />
            <div className="w-3 h-3 rounded-full bg-cyan animate-pulse-glow" />
            <div className="w-24 h-px bg-gradient-to-r from-cyan via-purple to-pink" />
            <div className="w-3 h-3 rounded-full bg-pink animate-pulse-glow" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-pink" />
          </div>
        </div>
      </div>
    </section>
  );
}
