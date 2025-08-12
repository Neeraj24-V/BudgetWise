
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function Snowfall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flakeCount = 50;
  const snowflakeSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 17.58A5 5 0 0 0 15 12v-2h-2v2a5 5 0 0 0-5 5.58"/>
      <path d="M2 12h20"/>
      <path d="m5 7 1.09 1.09"/>
      <path d="m12 2 1.09 1.09"/>
      <path d="m19 7-1.09 1.09"/>
      <path d="m5 17 1.09-1.09"/>
      <path d="m12 22-1.09-1.09"/>
      <path d="m19 17-1.09-1.09"/>
    </svg>
  `;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    for (let i = 0; i < flakeCount; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';
      flake.style.position = 'absolute';
      flake.style.opacity = '0';
      flake.innerHTML = snowflakeSVG;
      container.appendChild(flake);
      
      animateFlake(flake, containerWidth, containerHeight);
    }
  }, []);

  const animateFlake = (flake: HTMLDivElement, containerWidth: number, containerHeight: number) => {
    const size = Math.random() * 20 + 10;
    gsap.set(flake, {
      x: Math.random() * containerWidth,
      y: -20,
      width: size,
      height: size,
      opacity: Math.random() * 0.5 + 0.3,
    });

    const duration = Math.random() * 10 + 5;
    const endY = containerHeight * (Math.random() * 0.4 + 0.2); // Disappear between 20% and 60% of the way down

    gsap.to(flake, {
      duration: duration,
      y: endY,
      x: '+=_rand(-100, 100)',
      rotation: '+=_rand(-180, 180)',
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
