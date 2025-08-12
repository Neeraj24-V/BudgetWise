
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function Snowfall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flakeCount = 50;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    for (let i = 0; i < flakeCount; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';
      flake.style.position = 'absolute';
      flake.style.backgroundColor = 'white';
      flake.style.borderRadius = '50%';
      flake.style.opacity = '0';
      container.appendChild(flake);
      
      animateFlake(flake, containerWidth, containerHeight);
    }
  }, []);

  const animateFlake = (flake: HTMLDivElement, containerWidth: number, containerHeight: number) => {
    gsap.set(flake, {
      x: Math.random() * containerWidth,
      y: -20,
      width: Math.random() * 5 + 2,
      height: Math.random() * 5 + 2,
      opacity: Math.random() * 0.5 + 0.3,
    });

    const duration = Math.random() * 10 + 5;
    const endY = containerHeight * (Math.random() * 0.4 + 0.2); // Disappear between 20% and 60% of the way down

    gsap.to(flake, {
      duration: duration,
      y: endY,
      x: '+=_rand(-100, 100)',
      ease: 'none',
      onComplete: () => {
        gsap.to(flake, {
          duration: Math.random() * 2 + 1,
          opacity: 0,
          onComplete: () => {
            animateFlake(flake, containerWidth, containerHeight); // Loop the animation
          },
        });
      },
    });
  };

  return <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none"></div>;
}
