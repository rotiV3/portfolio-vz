import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Game Overlay',
    description: 'Desktop overlay displaying real-time contextual game data. Built in C# with custom UI rendering and event handling.',
    tech: ['C#', '.NET', 'WPF'],
    github: 'https://github.com/rotiV3/WhalleyBotOverlay',
    color: 'from-red-900/40 to-black',
  },
  {
    title: 'Enterprise Attendance',
    description: 'Dynamic HR data collection system with a rich UI. Designed for enterprise-scale attendance management.',
    tech: ['ASP.NET', 'Blazor', 'MudBlazor'],
    link: 'https://attendanceapp-demo.zeration.com/',
    color: 'from-blue-900/40 to-black',
  },
  {
    title: 'Portfolio VZ',
    description: 'This portfolio — a React/Vite site with a scroll-driven 3D server cluster, matrix rain, and animated sections.',
    tech: ['React', 'Three.js', 'GSAP', 'Tailwind'],
    github: 'https://github.com/rotiV3/portfolio-vz',
    color: 'from-purple-900/40 to-black',
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      <div className={`relative bg-black/50 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-500
        ${hovered ? 'border-red-500/60 shadow-[0_0_30px_rgba(220,38,38,0.2)]' : 'border-white/10'}`}
      >
        <div className={`h-36 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
          <motion.div
            className="absolute inset-x-0 h-px bg-red-500/40"
            animate={hovered ? { top: ['0%', '100%'] } : { top: '0%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <span className="absolute bottom-3 right-5 text-6xl font-black text-white/5 select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${hovered ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-red-600'}`} />
            <span className="text-white/30 text-xs font-mono">{hovered ? 'ACTIVE' : 'STANDBY'}</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span key={t} className="text-xs bg-red-600/15 text-red-400 border border-red-600/20 px-2.5 py-1 rounded-full font-mono">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors duration-200">
                <Github size={14} /> Source
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/60 hover:text-red-400 transition-colors duration-200">
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      className="relative min-h-screen flex items-center justify-center text-white py-24 px-6"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-5xl w-full mx-auto">
        <div ref={ref}>
          <motion.p
            className="text-red-500 uppercase tracking-[0.3em] text-xs mb-3 font-mono text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            — Server door opening —
          </motion.p>
          <motion.h2
            className="text-5xl md:text-6xl font-black text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            My <span className="text-red-600">Projects</span>
          </motion.h2>
          <motion.p
            className="text-gray-500 text-center mb-16 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Each blade slot — one project.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
