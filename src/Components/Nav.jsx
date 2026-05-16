import React, { useEffect, useState } from 'react';
import {Link } from "react-router";
import { motion } from "motion/react";
import { Menu, X, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useNavigation } from './NavigationContext';
export function Nav() {

    const { activeSection, setActiveSection } = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleClick = () => {
        setActiveSection(item);
        setIsMenuOpen(isMenuOpen);
    };


    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="text-2xl font-bold">
                        <motion.span className="text-red-600 center-hero"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 5 }}
                        >Vitor</motion.span>
                        <motion.span>Zezere</motion.span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {['home', 'about', 'projects', 'contact'].map((item) => (
                            item == "home" ?
                            <Link
                                key={item}
                                to={`/`}
                                onClick={() => setActiveSection(item)}
                                className={`uppercase font-extrabold transition-colors duration-300 hover:text-red-600 ${activeSection === item ? 'text-red-600' : 'text-white'
                                    }`}
                            >
                                {item}
                                </Link>
                                : <Link
                                    key={item}
                                    to={`/${item}`}
                                    onClick={() => setActiveSection(item)}
                                    className={`uppercase font-extrabold transition-colors duration-300 hover:text-red-600 ${activeSection === item ? 'text-red-600' : 'text-white'
                                        }`}
                                >
                                    {item}
                                </Link>
                        ))}
                    </div>


                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-sm">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {['home', 'about', 'projects', 'contact'].map((item) => (
                            item == "home" ? <Link
                                key={item}
                                onClick={handleClick}
                                to={`/`}
                                className={`uppercase font-extrabold block w-full text-left px-3 py-2 rounded-md transition-colors duration-300 ${activeSection === item ? 'bg-red-600 text-white' : 'text-white hover:bg-red-600/20'
                                    }`}
                            >
                                {item}
                        </Link>
                        :<Link
                            key={item}
                            onClick={handleClick}
                            to={`/${item}`}
                            className={`uppercase font-extrabold block w-full text-left px-3 py-2 rounded-md transition-colors duration-300 ${activeSection === item ? 'bg-red-600 text-white' : 'text-white hover:bg-red-600/20'
                                }`}
                        >
                            {item}
                        </Link>

                        ))}
                    </div>
                </div>
            )}
        </nav>
  );
}

export default Nav;