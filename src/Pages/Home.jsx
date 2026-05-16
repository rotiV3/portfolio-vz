import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function Home() {
  const ref = useRef(null);

  // Typed text effect
  useEffect(() => {
    const words = ['Developer', 'Problem Solver', 'C# Engineer', 'Builder'];
    let wi = 0, ci = 0, deleting = false;
    const el = ref.current;
    if (!el) return;

    const tick = () => {
      const word = words[wi % words.length];
      el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ++ci);

      if (!deleting && ci === word.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
      if (deleting && ci === 0) {
        deleting = false;
        wi++;
      }
      setTimeout(tick, deleting ? 55 : 90);
    };
    tick();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      style={{ zIndex: 10 }}
    >
      <div className="text-center px-6 max-w-3xl">
        <motion.p
          className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4 font-mono"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Portfolio
        </motion.p>

        <motion.h1
          className="text-6xl md:text-8xl font-black mb-4 leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          Hi, I'm{' '}
          <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]">
            Vitor
          </span>
        </motion.h1>

        <motion.div
          className="text-2xl md:text-3xl text-gray-300 mb-2 h-10 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <span ref={ref} className="text-white font-semibold" />
          <span className="animate-pulse text-red-500">|</span>
        </motion.div>

        <motion.p
          className="text-gray-500 text-sm mt-2 mb-10 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Junior C# Developer · Gloucester, UK
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
          >
            View My Work
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-white/20 hover:border-red-500 text-white/80 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-red-500/10"
          >
            Let's Connect
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-xs uppercase tracking-widest font-mono">scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Home;
