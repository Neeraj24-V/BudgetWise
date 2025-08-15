
"use client";

import { useState, useContext, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth-context';
import { Home, LogIn, LogOut, Settings, UserPlus } from 'lucide-react';
import { gsap } from 'gsap';
import { Draggable } from "gsap/Draggable";
import { cn } from '@/lib/utils';

gsap.registerPlugin(Draggable);

interface NavItemProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ onClick, icon, label }: NavItemProps) => (
  <Button
    variant="ghost"
    className="w-full justify-start h-14 text-lg"
    onClick={onClick}
  >
    {icon}
    <span className="ml-4">{label}</span>
  </Button>
);

export function MobileDrawer() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerRef.current) return;
    
    const screenHeight = window.innerHeight;
    const drawerHeight = drawerRef.current.offsetHeight;
    const closedY = screenHeight - 60; // How much is visible when closed
    const openY = screenHeight - drawerHeight;

    gsap.set(drawerRef.current, { y: closedY });

    const draggableInstance = Draggable.create(drawerRef.current, {
      type: "y",
      bounds: { minY: openY, maxY: closedY },
      edgeResistance: 0.5,
      onDragEnd: function() {
        if (this.y < closedY - 50) { // Threshold to open
          gsap.to(this.target, { y: openY, duration: 0.3, ease: "power2.out" });
          setIsDrawerOpen(true);
        } else {
          gsap.to(this.target, { y: closedY, duration: 0.3, ease: "power2.out" });
          setIsDrawerOpen(false);
        }
      }
    });

    return () => {
      draggableInstance[0].kill();
    }
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const navItems = isAuthenticated
    ? [
        { label: 'Dashboard', icon: <Home className="h-6 w-6" />, onClick: () => handleNavigation('/dashboard') },
        { label: 'Settings', icon: <Settings className="h-6 w-6" />, onClick: () => handleNavigation('/settings') },
        { label: 'Logout', icon: <LogOut className="h-6 w-6" />, onClick: handleLogout },
      ]
    : [
        { label: 'Login', icon: <LogIn className="h-6 w-6" />, onClick: () => handleNavigation('/login') },
        { label: 'Register', icon: <UserPlus className="h-6 w-6" />, onClick: () => handleNavigation('/login?view=register') },
      ];

  return (
    <>
      {/* Overlay to close drawer on click */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => {
              if (drawerRef.current) {
                 const screenHeight = window.innerHeight;
                 const closedY = screenHeight - 60;
                 gsap.to(drawerRef.current, { y: closedY, duration: 0.3, ease: "power2.out" });
                 setIsDrawerOpen(false);
              }
          }}
        />
      )}
      <div
        ref={drawerRef}
        className={cn(
          "fixed left-0 right-0 z-50 h-auto rounded-t-2xl border-t bg-background shadow-2xl md:hidden",
          "flex flex-col p-4"
        )}
      >
        {/* Handle */}
        <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mb-4 cursor-grab"></div>
        
        {/* Navigation Items */}
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </nav>
      </div>
    </>
  );
}
