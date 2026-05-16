import { useEffect, useRef } from 'react';
import { Nav } from './Components/Nav';
import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { Projects } from './Pages/Projects';
import { Contact } from './Pages/Contact';
import ServerScene from './Components/ServerScene';

// Matrix rain canvas
function MatrixCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '01';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops   = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#dc2626';
      ctx.font = `${fontSize}px monospace`;
      ctx.globalAlpha = 0.35;

      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    };

    const id = setInterval(draw, 50);
    const onResize = () => {
      resize();
      columns = Math.floor(canvas.width / fontSize);
      drops   = Array(columns).fill(1);
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearInterval(id);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default function Portfolio() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} className="bg-black text-white">
      {/* Layer 0: matrix rain */}
      <MatrixCanvas />

      {/* Layer 1: 3D server (Three.js) */}
      <ServerScene containerRef={scrollRef} />

      {/* Dark gradient overlay so text is readable over the 3D scene */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse at 70% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Layer 3+: UI */}
      <Nav />

      <main style={{ position: 'relative', zIndex: 10 }}>
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>

      <footer
        className="relative border-t border-white/10 py-8 text-center text-gray-600 text-xs font-mono"
        style={{ zIndex: 10 }}
      >
        © 2025 Vitor Zezere · Built with React, Three.js & GSAP
      </footer>
    </div>
  );
}
