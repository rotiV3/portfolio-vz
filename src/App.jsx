import React, {useState} from 'react';
import { motion } from "motion/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { Nav } from "./Components/Nav";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Projects } from "./Pages/Projects";
import { Contact } from "./Pages/Contact";
import FloatingIcons from "./Components/FloatingIcons";
import { NavigationProvider } from './Components/NavigationContext';



export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('home');


    return (

        <BrowserRouter>
        <NavigationProvider>
            <div className="bg-black text-white ">
                <div className="fixed inset-0 z-0">
                    <canvas id="matrix-canvas" className="matrix-canvas"></canvas>
                    {/* Dark overlay with red gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-red-950/20 to-black/80"></div>
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <Nav activeSection={activeSection} setActiveSection={setActiveSection} />
            </div>
            <motion.div>

                <FloatingIcons activeSection={activeSection} />
                <AnimatedRoutes />
            </motion.div>


            {/* Footer */}
            <footer className="bg-black border-t border-white/10 py-8 text-center text-gray-400 relative z-10">
                <p>&copy; 2025 Vitor. All rights reserved.</p>
            </footer>


            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        /* Matrix Canvas */
        .matrix-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .matrix-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        /* Particle Canvas */
        .particle-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        /* Assembly Line Canvas */
        .assembly-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        /* Waves Animation */
        .waves-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .waves {
          position: absolute;
          width: 200%;
          height: 100%;
          bottom: 0;
          left: 0;
        }

        .wave-group use:nth-child(1) {
          animation: wave-move 15s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
          animation-delay: -2s;
        }

        .wave-group use:nth-child(2) {
          animation: wave-move 20s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
          animation-delay: -3s;
          opacity: 0.7;
        }

        .wave-group use:nth-child(3) {
          animation: wave-move 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
          animation-delay: -4s;
          opacity: 0.5;
        }

        .wave-group use:nth-child(4) {
          animation: wave-move 30s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
          animation-delay: -5s;
        }

        @keyframes wave-move {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
      `}</style>
            </NavigationProvider>
                  </BrowserRouter>
           

        

    );
}


function AnimatedRoutes() {
    const location = useLocation();
    return (
        <motion.div mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path = "/projects" element = {<PageTransition><Projects /></PageTransition>} />
                <Route path = "/contact" element = {<PageTransition>< Contact /></PageTransition >} />
            </Routes>
        </motion.div>
    );
}

function PageTransition({children}) {
    return <motion.div className="page"
        inittial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.5, ease:"easeout"}}
    >
        {children }
    </motion.div>
}
 
// Initialize animations after component mounts
if (typeof window !== 'undefined') {
    setTimeout(() => {
        // Matrix Rain Effect
        const matrixCanvas = document.getElementById('matrix-canvas');
        if (matrixCanvas) {
            const ctx = matrixCanvas.getContext('2d');
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;

            const chars = '0111101010010100100000100101111110110010101001111110101010101111101010101';
            const fontSize = 28;
            const columns = matrixCanvas.width / fontSize;
            const drops = Array(Math.floor(columns)).fill(1);

            function drawMatrix() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

                ctx.fillStyle = '#ef4444';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            }

            setInterval(drawMatrix, 50);
        }
    }, 100);
}
