import { motion } from "motion/react";
import { Menu, X, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';



const projects = [
    {
        title: 'Game Overlay',
        description: 'Desktop overlay to display real-time contextual information during gameplay. Built with C# to practice UI rendering and event handling.',
        tech: ['C#', '.NET'],
        github: 'https://github.com/rotiV3/WhalleyBotOverlay',
    }, ,
    {
        title: "Enterprise Attendance Management",
        description: "Dinamic design system for Human resurces data collection.",
        tech: ["ASP.net", "Blazor", "MudBlazor"],
        link: "https://attendanceapp-demo.zeration.com/"
    }
];


export function Projects() {
  return (
      <section id="projects" className="min-h-screen flex items-center justify-center relative overflow-hidden text-white">
          {/* Assembly Line Background */}
          {/*<canvas id="assembly-canvas" className="assembly-canvas"></canvas>*/}
          {/*<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95"></div>*/}

          <div className="max-w-6xl mx-auto relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                  My <span className="text-red-600">Projects</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                      <div
                          key={index}
                          className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-red-600/50 transition-all duration-300 transform hover:-translate-y-2"
                      >
                          <div className="h-48 bg-gradient-to-br from-red-600/30 to-black"></div>
                          <div className="p-6">
                              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                              <p className="text-gray-400 mb-4">{project.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                  {project.tech.map((tech, i) => (
                                      <span key={i} className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded">
                                          {tech}
                                      </span>
                                  ))}
                              </div>
                              <a
                                  href={project.link}
                                  className="inline-flex items-center text-red-600 hover:text-red-400 transition-colors duration-300"
                              >
                                  View Project <ExternalLink size={16} className="ml-2" />
                              </a>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
  );
}

export default Projects;