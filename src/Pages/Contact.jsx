import { motion } from "motion/react";
import { Menu, X, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';


export function Contact() {
  return (
      <section id="contact" className="min-h-screen flex items-center justify-center relative overflow-hidden text-white">
          {/* Animated Waves Background */}
          {/*<div className="waves-container">*/}
          {/*    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">*/}
          {/*        <defs>*/}
          {/*            <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />*/}
          {/*        </defs>*/}
          {/*        <g className="wave-group">*/}
          {/*            <use xlinkHref="#wave-path" x="48" y="0" fill="rgba(239, 68, 68, 0.05)" />*/}
          {/*            <use xlinkHref="#wave-path" x="48" y="3" fill="rgba(239, 68, 68, 0.08)" />*/}
          {/*            <use xlinkHref="#wave-path" x="48" y="5" fill="rgba(239, 68, 68, 0.1)" />*/}
          {/*            <use xlinkHref="#wave-path" x="48" y="7" fill="rgba(0, 0, 0, 0.5)" />*/}
          {/*        </g>*/}
          {/*    </svg>*/}
          {/*</div>*/}

          <div className="max-w-4xl mx-auto w-full relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" >
                  Get In <span className="text-red-600">Touch</span>
              </h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                  <p className="text-lg text-gray-300 mb-8 text-center">
                      I'm always open to new opportunities and collaborations. Let's create something amazing together!
                  </p>
                  <div className="flex justify-center space-x-6 mb-8">
                      <a href="https://github.com/rotiV3/Vitor-Zezere" className="bg-white/10 p-4 rounded-full hover:bg-red-600 transition-colors duration-300">
                          <Github size={24} />
                      </a>
                      <a href="https://linkedin.com/in/vitor-zezere" className="bg-white/10 p-4 rounded-full hover:bg-red-600 transition-colors duration-300">
                          <Linkedin size={24} />
                      </a>
                      <a href="mailto:vitor.zezere@gmail.com" className="bg-white/10 p-4 rounded-full hover:bg-red-600 transition-colors duration-300">
                          <Mail size={24} />
                      </a>
                  </div>
                  <div className="text-center">
                      <a
                          href="mailto:vitor.zezere@gmail.com"
                          className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                      >
                          Send Me an Email
                      </a>
                  </div>
              </div>
          </div>
      </section>
  );
}

export default Contact;