
"use client";

import { useState, useContext, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth-context';
import { Home, LogIn, LogOut, Menu, Settings, UserPlus, X } from 'lucide-react';
import { gsap } from 'gsap';

interface NavItemProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

const NavItem = ({ onClick, icon, label, className }: NavItemProps) => (
  <div className="flex items-center justify-end space-x-2">
    <div className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md shadow-sm">
      {label}
    </div>
    <Button
      size="icon"
      className={`rounded-full h-12 w-12 shadow-lg ${className}`}
      onClick={onClick}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  </div>
);

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const navItemsContainerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(navItemsContainerRef.current, { autoAlpha: 0 });
      tl.current = gsap.timeline({ paused: true })
        .to(navItemsContainerRef.current, {
          autoAlpha: 1,
          duration: 0.1
        })
        .fromTo('.nav-item', 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 }
        );
    }, menuRef);

    return () => ctx.revert();
  }, [])


  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
    setIsOpen(false);
  };

  const navItems = isAuthenticated
    ? [
        {
          label: 'Dashboard',
          icon: <Home className="h-6 w-6" />,
          onClick: () => handleNavigation('/dashboard'),
        },
        {
          label: 'Settings',
          icon: <Settings className="h-6 w-6" />,
          onClick: () => handleNavigation('/settings'),
        },
        {
          label: 'Logout',
          icon: <LogOut className="h-6 w-6" />,
          onClick: handleLogout,
        },
      ]
    : [
        {
          label: 'Login',
          icon: <LogIn className="h-6 w-6" />,
          onClick: () => handleNavigation('/login'),
        },
        {
          label: 'Register',
          icon: <UserPlus className="h-6 w-6" />,
          onClick: () => handleNavigation('/login?view=register'),
        },
      ];

  return (
    <>
      {/* Overlay to close menu on click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
        {/* Expanded Menu */}
        <div 
          ref={navItemsContainerRef} 
          className="flex flex-col items-end space-y-3"
         >
              {navItems.map((item) => (
                  <div className="nav-item" key={item.label}>
                     <NavItem {...item} />
                  </div>
              ))}
          </div>

        {/* Main Floating Action Button (FAB) */}
        <div className="flex justify-end mt-4">
          <Button
            size="icon"
            className="rounded-full h-16 w-16 shadow-2xl relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <X className={`h-8 w-8 absolute transition-all duration-300 ${isOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            <Menu className={`h-8 w-8 absolute transition-all duration-300 ${!isOpen ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
    </>
  );
}
