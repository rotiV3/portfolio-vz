import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingIcons.css';
import { useNavigation } from './NavigationContext';

const FloatingIcons = () => {
    const { activeSection, setActiveSection } = useNavigation();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const animationFrameRef = useRef(null);

    const icons = [
        {
            id: 'contact',
            path: '/contact',
            image: 'https://cdn-icons-png.flaticon.com/512/724/724664.png',
            label: 'Contact',
            color: '#ff6b6b'
        },
        {
            id: 'projects',
            path: '/projects',
            image: 'https://cdn-icons-png.flaticon.com/512/4712/4712109.png',
            label: 'Projects',
            color: '#ff6b6b'
        },
        {
            id: 'about',
            path: '/about',
            image: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
            label: 'About',
            color: '#ff6b6b'
        }
    ];

    // Use refs for smooth animation - no React state updates
    const targetsRef = useRef(
        icons.map(() => ({
            x: Math.random() * (window.innerWidth - 150) + 75,
            y: Math.random() * (window.innerHeight - 150) + 75,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: 40,
            element: null // Will store DOM reference
        }))
    );

    const iconsRef = useRef(
        icons.map(() => ({
            x: Math.random() * (window.innerWidth - 200) + 100,
            y: Math.random() * (window.innerHeight - 200) + 100,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            element: null // Will store DOM reference
        }))
    );

    const linesRef = useRef(icons.map(() => null));

    const [locked, setLocked] = useState(icons.map(() => false));
    const [dragging, setDragging] = useState(null);
    const [heroCenter, setHeroCenter] = useState({ x: 0, y: 0 });

    // Get hero element center position
    useEffect(() => {
        const updateHeroPosition = () => {
            const heroElement = document.querySelector('.center-hero'); // Changed from '.hero'
            if (heroElement) {
                const rect = heroElement.getBoundingClientRect();
                setHeroCenter({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                });
            }
        };

        updateHeroPosition();
        window.addEventListener('resize', updateHeroPosition);
        window.addEventListener('scroll', updateHeroPosition);

        return () => {
            window.removeEventListener('resize', updateHeroPosition);
            window.removeEventListener('scroll', updateHeroPosition);
        };
    }, []);

    // Mouse drag handlers
    const handleMouseDown = (index, e) => {
        e.preventDefault();

        // If locked, navigate on click
        if (locked[index]) {
            navigate(icons[index].path);
            setActiveSection(icons[index].id);
            updateHeroPosition();
            return;
        }

        setDragging(index);
    };

    const handleMouseMove = (e) => {
        if (dragging === null) return;

        const icon = iconsRef.current[dragging];
        icon.x = e.clientX - 40;
        icon.y = e.clientY - 40;
        icon.vx = 0;
        icon.vy = 0;

        // Update DOM directly
        if (icon.element) {
            icon.element.style.left = `${icon.x}px`;
            icon.element.style.top = `${icon.y}px`;
        }
    };

    const handleMouseUp = (e) => {
        if (dragging !== null) {
            const icon = iconsRef.current[dragging];
            icon.vx = (Math.random() - 0.5) * 5;
            icon.vy = (Math.random() - 0.5) * 5;
            setDragging(null);
        }
    };

    // Physics animation loop - pure DOM manipulation for 60fps
    useEffect(() => {
        const animate = () => {
            const targets = targetsRef.current;
            const iconsList = iconsRef.current;
            const lines = linesRef.current;

            iconsList.forEach((icon, index) => {
                // Don't move if locked or being dragged
                if (locked[index] || dragging === index) return;

                // Update position
                icon.x += icon.vx;
                icon.y += icon.vy;

                // Bounce off walls
                if (icon.x <= 40 || icon.x >= window.innerWidth - 40) {
                    icon.vx *= -0.8;
                    icon.x = icon.x <= 40 ? 40 : window.innerWidth - 40;
                }
                if (icon.y <= 40 || icon.y >= window.innerHeight - 40) {
                    icon.vy *= -0.8;
                    icon.y = icon.y <= 40 ? 40 : window.innerHeight - 40;
                }

                // Check collision with targets
                const target = targets[index];
                const dx = (icon.x + 40) - target.x;
                const dy = (icon.y + 40) - target.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < target.radius + 40 && !locked[index]) {
                    // Icon touched the target - lock it!
                    setLocked(prev => {
                        const newLocked = [...prev];
                        newLocked[index] = true;
                        return newLocked;
                    });

                    // Snap to target center
                    icon.x = target.x - 40;
                    icon.y = target.y - 40;
                    icon.vx = 0;
                    icon.vy = 0;
                }

                // Update icon DOM
                if (icon.element) {
                    icon.element.style.left = `${icon.x}px`;
                    icon.element.style.top = `${icon.y}px`;
                }

                // Update line DOM
                if (lines[index]) {
                    lines[index].setAttribute('x2', icon.x + 40);
                    lines[index].setAttribute('y2', icon.y + 40);
                }
            });

            // Update targets (only if not locked)
            targets.forEach((target, index) => {
                if (locked[index]) return;

                target.x += target.vx;
                target.y += target.vy;

                if (target.x <= target.radius || target.x >= window.innerWidth - target.radius) {
                    target.vx *= -1;
                    target.x = target.x <= target.radius ? target.radius : window.innerWidth - target.radius;
                }
                if (target.y <= target.radius || target.y >= window.innerHeight - target.radius) {
                    target.vy *= -1;
                    target.y = target.y <= target.radius ? target.radius : window.innerHeight - target.radius;
                }

                // Update target DOM
                if (target.element) {
                    target.element.style.left = `${target.x - target.radius}px`;
                    target.element.style.top = `${target.y - target.radius}px`;
                }
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [dragging, locked]);

    useEffect(() => {
        if (dragging !== null) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [dragging]);

    return (
        <>
            <svg className="connection-lines">
                {icons.map((icon, index) => {
                    const iconData = iconsRef.current[index];
                    return (
                        <line
                            key={`line-${index}`}
                            ref={el => linesRef.current[index] = el}
                            x1={heroCenter.x}
                            y1={heroCenter.y}
                            x2={iconData.x + 40}
                            y2={iconData.y + 40}
                            stroke={icon.color}
                            strokeWidth={locked[index] ? "4" : "2"}
                            strokeDasharray={locked[index] ? "0" : "5,5"}
                            opacity={locked[index] ? "0.8" : "0.4"}
                            className={locked[index] ? "line-locked" : ""}
                        />
                    );
                })}
            </svg>

            <div className="floating-icons-container" ref={containerRef}>
                {/* Navigation Targets (Portals) */}
                {targetsRef.current.map((target, index) => (
                    <div
                        key={`target-${index}`}
                        ref={el => target.element = el}
                        className={`navigation-target ${locked[index] ? 'locked' : ''}`}
                        style={{
                            left: `${target.x - target.radius}px`,
                            top: `${target.y - target.radius}px`,
                            width: `${target.radius * 2}px`,
                            height: `${target.radius * 2}px`,
                            borderColor: icons[index].color,
                            boxShadow: locked[index]
                                ? `0 0 40px ${icons[index].color}, 0 0 80px ${icons[index].color}80`
                                : `0 0 20px ${icons[index].color}40`
                        }}
                    >
                        <span className="target-label">{icons[index].label}</span>
                    </div>
                ))}

                {/* Draggable Icons */}
                {icons.map((icon, index) => {
                    const iconData = iconsRef.current[index];
                    return (
                        <div
                            key={icon.id}
                            ref={el => iconData.element = el}
                            className={`floating-icon ${dragging === index ? 'dragging' : ''} ${locked[index] ? 'locked' : ''}`}
                            style={{
                                left: `${iconData.x}px`,
                                top: `${iconData.y}px`,
                            }}
                            onMouseDown={(e) => handleMouseDown(index, e)}
                        >
                            <div
                                className="icon-content"
                                style={{
                                    borderColor: locked[index] ? icon.color : 'rgba(255, 255, 255, 0.3)',
                                    boxShadow: locked[index]
                                        ? `0 0 30px ${icon.color}`
                                        : '0 8px 32px rgba(0, 0, 0, 0.2)'
                                }}
                            >
                                <img
                                    src={icon.image}
                                    alt={icon.label}
                                    className="icon-image"
                                    draggable="false"
                                />
                                {locked[index] && (
                                    <div className="click-hint">
                                        <span>{icons[index].label}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default FloatingIcons;