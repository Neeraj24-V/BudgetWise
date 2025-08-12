
"use client";

import { BarChart3, ListChecks, Smartphone, ShieldCheck, Siren, Cpu, Moon, Sun, Palette } from "lucide-react";
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeToggle } from "@/components/theme-toggle";
import { CurrencyFall } from "@/components/currency-fall";

gsap.registerPlugin(ScrollTrigger);

const FinFlowLogo = ({ className }: {className?: string}) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
        <path
            d="M8.33333 3V9.5M8.33333 9.5V16M8.33333 9.5H18.3333M13.3333 16V21M13.3333 16H3.33333"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

export default function Home() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray('.feature-card');
      cards.forEach((card, index) => {
        let animationProps = {};
        if (index === 0) { 
          animationProps = { x: -100 };
        } else if (index === 1) { 
          animationProps = { y: 100 };
        } else { 
          animationProps = { x: 100 };
        }
        
        gsap.from(card as gsap.TweenTarget, {
          ...animationProps,
          opacity: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card as gsap.TweenTarget,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          }
        });
      });

      gsap.from(".how-it-works-card", {
        opacity: 0,
        y: 100,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".how-it-works-section",
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        }
      });
      
      gsap.from(".bento-item", {
        opacity: 0,
        scale: 0.9,
        y: 30,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        }
      });

    }, root);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <ListChecks className="h-8 w-8 text-primary-foreground" />,
      title: "Track Expenses Effortlessly",
      description: "Easily log your daily expenses and categorize them to see where your money is going. Stay on top of your spending with minimal effort.",
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1-.9-2-2-2Z"/></svg>,
      title: "Smart Budgeting",
      description: "Create custom budgets for different categories and get notified when you're approaching your limits. Plan your finances and save more effectively.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary-foreground" />,
      title: "Visualize Your Spending",
      description: "Get a clear picture of your financial habits with insightful charts and reports. Understand your spending patterns to make smarter decisions.",
    },
  ];

  return (
    <div ref={root} className="min-h-screen bg-black text-foreground overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
          <a href="/" className="flex items-center space-x-2">
            <FinFlowLogo className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block">FinFlow</span>
          </a>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="hidden md:flex items-center space-x-2">
              <a href="/dashboard" className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary">
                Dashboard
              </a>
              <a href="/login" className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary">
                Login
              </a>
              <a href="/register" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">
                Register
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-background py-24 sm:py-32 relative isolate overflow-hidden">
          <CurrencyFall />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 hero-element">
              Take Control of Your Finances
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 hero-element">
              An elegant solution to track your expenses, manage your budgets, and achieve your financial goals with confidence.
            </p>
            <div className="space-x-4 hero-element">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-semibold">
                Get Started
              </button>
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/50">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Everything You Need for Financial Clarity
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                Our platform is packed with powerful features designed to make managing your money simple and intuitive.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-background p-8 rounded-lg shadow-lg feature-card">
                  <div className="bg-primary/80 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-20 md:py-32 how-it-works-section px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Get Started in 3 Easy Steps
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                Start managing your finances with FinFlow in just a few minutes.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="how-it-works-card bg-background/70 p-6 rounded-lg border">
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-primary/80 text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Create Your Budget</h3>
                <p className="text-muted-foreground">Set up your monthly and category budgets to stay on track.</p>
              </div>
              <div className="how-it-works-card bg-background/70 p-6 rounded-lg border">
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-primary/80 text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Log Your Expenses</h3>
                <p className="text-muted-foreground">Easily add expenses as they happen with our simple interface.</p>
              </div>
              <div className="how-it-works-card bg-background/70 p-6 rounded-lg border">
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-primary/80 text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold mb-2">See Your Progress</h3>
                <p className="text-muted-foreground">Visualize your spending with charts and reports to make informed decisions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Box Section */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/50">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Your Financial Command Center</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                All the tools you need, beautifully organized in one place.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 bento-grid">
              <div className="md:col-span-2 p-8 bg-background/70 rounded-lg shadow-lg flex flex-col justify-center items-center text-center bento-item border">
                  <BarChart3 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Interactive Dashboard</h3>
                  <p className="text-muted-foreground">A crystal-clear overview of your financial health at a glance. Track everything from one central hub.</p>
              </div>
              <div className="p-8 bg-background/70 rounded-lg shadow-lg flex flex-col justify-center items-center text-center bento-item border">
                  <Siren className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Smart Alerts</h3>
                  <p className="text-muted-foreground">Get notified before you overspend.</p>
              </div>
              <div className="p-8 bg-background/70 rounded-lg shadow-lg flex flex-col justify-center items-center text-center bento-item border">
                  <Cpu className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">AI Insights</h3>
                  <p className="text-muted-foreground">Receive personalized tips to save more.</p>
              </div>
              <div className="md:col-span-2 p-8 bg-background/70 rounded-lg shadow-lg flex flex-col justify-center items-center text-center bento-item border">
                  <Smartphone className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Multi-Device Sync</h3>
                  <p className="text-muted-foreground">Access your financial data on your phone, tablet, or desktop. Always in sync, always up-to-date.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 border-t bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} FinFlow. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
