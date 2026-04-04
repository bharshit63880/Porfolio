import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Calendar, ChevronRight } from 'lucide-react';

const journeyData = [
  {
    id: 1,
    type: 'work',
    title: 'Full Stack Developer Intern',
    company: 'Altius Technologies',
    period: 'Sep 2025 – Present',
    description: [
      'Built company\'s official website using React + Node.js + Express',
      'Accelerated project delivery by 30% through optimized workflows',
      'Implemented scalable backend and responsive frontend',
    ],
    icon: Briefcase,
    color: 'cyan',
  },
  {
    id: 2,
    type: 'education',
    title: 'B.Tech Computer Science',
    company: 'SRGI Jhansi',
    period: '2022 – 2026',
    description: [
      'Pursuing Bachelor of Technology in Computer Science',
      'Current CGPA: 7.5',
      'Active in coding competitions and technical events',
    ],
    icon: GraduationCap,
    color: 'purple',
  },
];

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
      id="journey"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan/30 to-transparent" />
      
      <div className="relative z-10 section-padding max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="font-mono text-cyan text-sm tracking-widest mb-4 block">
            &lt;Timeline /&gt;
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            MY <span className="gradient-text">JOURNEY</span>
          </h2>
          <p className="font-body text-white/60 max-w-xl mx-auto">
            My professional path and educational background that shaped my career
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {journeyData.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;
            
            return (
              <div
                key={item.id}
                className={`relative mb-12 last:mb-0 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className={`flex flex-col lg:flex-row gap-6 lg:gap-12 items-start ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}>
                  {/* Content Card */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div 
                      className={`relative p-6 sm:p-8 rounded-2xl glass group hover:border-${item.color}/50 transition-all duration-500 cursor-pointer ${
                        isActive ? `border-${item.color}/50 shadow-glow` : ''
                      }`}
                    >
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${item.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        {/* Header */}
                        <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                          <span className={`px-3 py-1 text-xs font-mono rounded-full bg-${item.color}/20 text-${item.color}`}>
                            {item.type === 'work' ? 'Experience' : 'Education'}
                          </span>
                          <div className="flex items-center gap-2 text-white/50 text-sm">
                            <Calendar size={14} />
                            <span>{item.period}</span>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className={`font-body text-${item.color} mb-4`}>
                          {item.company}
                        </p>
                        
                        {/* Description */}
                        <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:ml-auto' : ''}`}>
                          {item.description.map((desc, i) => (
                            <li 
                              key={i} 
                              className={`flex items-start gap-2 text-white/70 text-sm ${index % 2 === 0 ? 'lg:flex-row-reverse lg:text-right' : ''}`}
                            >
                              <ChevronRight size={16} className={`text-${item.color} mt-0.5 flex-shrink-0`} />
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Corner Decoration */}
                      <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-20 h-20 opacity-20`}>
                        <div className={`w-full h-full border-t-2 border-${item.color} ${index % 2 === 0 ? 'border-r-2 rounded-tr-2xl' : 'border-l-2 rounded-tl-2xl'}`} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Center Icon */}
                  <div className="hidden lg:flex flex-col items-center">
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? `bg-${item.color} shadow-glow` 
                          : 'bg-surface border border-white/20'
                      }`}
                    >
                      <Icon size={28} className={isActive ? 'text-black' : `text-${item.color}`} />
                    </div>
                    {index < journeyData.length - 1 && (
                      <div className="w-px h-24 bg-gradient-to-b from-cyan/50 to-transparent mt-4" />
                    )}
                  </div>
                  
                  {/* Empty Space for Layout */}
                  <div className="flex-1 hidden lg:block" />
                </div>
                
                {/* Mobile Timeline Connector */}
                {index < journeyData.length - 1 && (
                  <div className="lg:hidden absolute left-8 top-16 w-px h-12 bg-gradient-to-b from-cyan/50 to-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
