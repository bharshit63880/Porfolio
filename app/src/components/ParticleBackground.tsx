import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: 'code' | 'skill';
  content: string;
}

const codeSnippets = ['</>', '{}', '[]', '()', '=>', '&&', '||', '??', '::', '++', '--'];
const skillIcons = ['⚛', '▲', '◆', '●', '■', '★', '♦', '♠'];

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = Math.min(30, Math.floor(window.innerWidth / 50));
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 12 + 8,
      opacity: Math.random() * 0.3 + 0.1,
      type: Math.random() > 0.6 ? 'skill' : 'code',
      content: Math.random() > 0.6 
        ? skillIcons[Math.floor(Math.random() * skillIcons.length)]
        : codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance
      if (frameCount % 2 === 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach((particle) => {
          // Mouse interaction
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150;
            particle.vx -= (dx / dist) * force * 0.02;
            particle.vy -= (dy / dist) * force * 0.02;
          }

          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Boundary check
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Damping
          particle.vx *= 0.99;
          particle.vy *= 0.99;

          // Draw particle
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          ctx.font = `${particle.size}px 'DM Mono'`;
          ctx.fillStyle = particle.type === 'code' 
            ? 'rgba(0, 240, 255, 0.6)' 
            : 'rgba(189, 0, 255, 0.6)';
          ctx.fillText(particle.content, particle.x, particle.y);
          ctx.restore();
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p1 = particlesRef.current[i];
            const p2 = particlesRef.current[j];
            const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
            if (dist < 100) {
              ctx.globalAlpha = (1 - dist / 100) * 0.2;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
