import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const skills = [
  { name: 'C#', level: 85 },
  { name: '.NET / ASP.NET', level: 80 },
  { name: 'Blazor / MudBlazor', level: 75 },
  { name: 'React', level: 65 },
  { name: 'Python', level: 60 },
  { name: 'SQL', level: 70 },
  { name: 'Git', level: 78 },
  { name: 'Docker', level: 50 },
];

function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1 text-sm">
        <span className="text-white/80 font-mono">{name}</span>
        <span className="text-red-500 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center text-white py-24 px-6"
      style={{ zIndex: 10 }}
    >
      <div ref={ref} className="max-w-5xl w-full mx-auto">
        {/* Section label */}
        <motion.p
          className="text-red-500 uppercase tracking-[0.3em] text-xs mb-3 font-mono text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          — Server screen opening —
        </motion.p>

        <motion.h2
          className="text-5xl md:text-6xl font-black text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          About <span className="text-red-600">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-500 font-mono text-xs uppercase tracking-widest">system.info</span>
              </div>

              <p className="text-gray-300 leading-relaxed mb-5">
                I'm a Junior C# Developer based in Gloucester, UK. I love building clean,
                functional software — from enterprise attendance systems to desktop overlays
                for gaming. My background spans backend .NET to modern React frontends.
              </p>
              <p className="text-gray-300 leading-relaxed mb-5">
                Currently deepening my skills in cloud infrastructure, self-hosting on Proxmox,
                and exploring the intersection of great UX and solid backend architecture.
              </p>

              <div className="border-t border-white/10 pt-5 mt-5 grid grid-cols-2 gap-3 text-sm font-mono">
                {[
                  ['Location', 'Gloucester, UK'],
                  ['Focus', 'C# / .NET'],
                  ['GitHub', 'rotiV3'],
                  ['Status', 'Open to work'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <span className="text-white/30 block text-xs">{k}</span>
                    <span className="text-white">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-mono text-xs uppercase tracking-widest">skills.load()</span>
              </div>

              {skills.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={0.1 * i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
