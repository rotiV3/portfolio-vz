import { motion } from "motion/react";

export function About() {
    return (
        <motion.div id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden text-white">
          {/* Particle Network Background */}
          {/*<canvas id="particle-canvas" className="particle-canvas"></canvas>*/}
          {/*<div className="absolute inset-0 bg-black/60"></div>*/}

          <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                  About <span className="text-red-600">Me</span>
              </h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      I'm a passionate developer who loves creating beautiful and functional web experiences.
                      With a keen eye for design and a strong foundation in modern web technologies, I bring
                      ideas to life through clean code and intuitive interfaces.
                  </p>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                      My journey in development has equipped me with skills in both frontend and backend
                      technologies, allowing me to build complete solutions from concept to deployment.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['C#', '.Net', 'ASP.net', 'Python', 'SQL', 'React', 'Git', 'MudBlazor'].map((skill) => (
                          <div key={skill} className="bg-red-600/10 border border-red-600/30 rounded-lg p-3 text-center hover:bg-red-600/20 transition-colors duration-300">
                              {skill}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </motion.div>
  );
}

export default About;