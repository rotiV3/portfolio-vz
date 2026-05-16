import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const links = [
    { icon: Github,   label: 'GitHub',   sub: 'rotiV3',              href: 'https://github.com/rotiV3' },
    { icon: Linkedin, label: 'LinkedIn', sub: 'vitor-zezere',         href: 'https://linkedin.com/in/vitor-zezere' },
    { icon: Mail,     label: 'Email',    sub: 'vitor.zezere@gmail.com', href: 'mailto:vitor.zezere@gmail.com' },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center text-white py-24 px-6"
      style={{ zIndex: 10 }}
    >
      <div ref={ref} className="max-w-3xl w-full mx-auto">
        <motion.p
          className="text-red-500 uppercase tracking-[0.3em] text-xs mb-3 font-mono text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          — Side panel open —
        </motion.p>

        <motion.h2
          className="text-5xl md:text-6xl font-black text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Get In <span className="text-red-600">Touch</span>
        </motion.h2>

        {/* Terminal-style card */}
        <motion.div
          className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Terminal header */}
          <div className="bg-white/5 border-b border-white/10 px-5 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <Terminal size={12} className="ml-3 text-white/30" />
            <span className="text-white/30 text-xs font-mono ml-1">contact.sh</span>
          </div>

          <div className="p-8">
            <div className="font-mono text-sm text-gray-400 mb-6 leading-relaxed">
              <span className="text-red-500">root@vitor-vz</span>
              <span className="text-white/30">:~$ </span>
              <span className="text-white">./reach-out.sh</span>
              <br />
              <span className="text-green-400">[INFO]</span> I'm always open to new opportunities
              <br />
              and collaborations. Let's build something amazing.
            </div>

            <div className="grid gap-4">
              {links.map(({ icon: Icon, label, sub, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/5
                    hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-red-500/20 flex items-center justify-center transition-colors duration-300">
                    <Icon size={18} className="text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm">{label}</div>
                    <div className="text-gray-500 text-xs font-mono truncate">{sub}</div>
                  </div>
                  <span className="text-white/20 group-hover:text-red-500 transition-colors duration-300 text-lg">→</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="mailto:vitor.zezere@gmail.com"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-3.5 rounded-full font-semibold
              transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(220,38,38,0.45)]"
          >
            Send me an email
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
