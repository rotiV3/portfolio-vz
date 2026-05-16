import { motion } from "motion/react";
import { Link } from "react-router";

export function Home() {
  return (
      <motion.div id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden text-white">

          <div className="relative z-10 text-center px-4 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  Hi, I'm <span className="text-red-600">Vitor</span> Zezere
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                  Junior C# Developer & Creative Problem Solver
              </p>
              {/*<p className="text-xl md:text-2xl text-gray-300 mb-8">vitor.zezere@gmail.com | github.com/rotiV3</p>*/}
              {/*<p className="text-sm">Gloucester, UK</p>*/}
              <Link
                  key="home"
                  to={`/contact`}
                  onClick={() => setActiveSection("contact")}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                  Lets link together
              </Link>
          </div>
          
      </motion.div>
  );
}

export default Home;