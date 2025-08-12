
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function CurrencyFall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currencies = ['$', '€', '£', '¥', '₹', '₿'];
  const lastCall = useRef(0);
  const throttleDelay = 100; // milliseconds

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastCall.current < throttleDelay) {
        return;
      }
      lastCall.current = now;

      const rect = container.getBoundingClientRect();
      createFallingCurrency(event.clientX - rect.left, event.clientY - rect.top);
    };

    const createFallingCurrency = (x: number, y: number) => {
      const currencyEl = document.createElement('div');
      currencyEl.innerText = currencies[Math.floor(Math.random() * currencies.length)];
      currencyEl.style.position = 'absolute';
      currencyEl.style.left = `${x}px`;
      currencyEl.style.top = `${y}px`;
      currencyEl.style.color = 'hsl(var(--primary))';
      currencyEl.style.fontSize = `${Math.random() * 20 + 16}px`;
      currencyEl.style.userSelect = 'none';
      container.appendChild(currencyEl);

      gsap.to(currencyEl, {
        y: container.offsetHeight - y - 20,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 360,
        duration: 1.5 + Math.random() * 1.5,
        ease: 'bounce.out',
        onComplete: () => {
          gsap.to(currencyEl, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                if (currencyEl.parentNode) {
                    currencyEl.parentNode.removeChild(currencyEl);
                }
            },
          });
        },
      });
    };
    
    const parentSection = container.parentElement;
    if (parentSection) {
        parentSection.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
        if (parentSection) {
            parentSection.removeEventListener('mousemove', handleMouseMove);
        }
    };
  }, [currencies]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0"></div>;
}
