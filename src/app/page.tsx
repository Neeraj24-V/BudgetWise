"use client";

import { PiggyBank, BarChart3, ListChecks } from "lucide-react";
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        if (index === 0) { // Left card
          animationProps = { x: -50 };
        } else if (index === 1) { // Middle card
          animationProps = { y: 50 };
        } else { // Right card
          animationProps = { x: 50 };
        }
        
        gsap.from(card as gsap.TweenTarget, {
          ...animationProps,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card as gsap.TweenTarget,
            start: "top 85%",
          }
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <ListChecks className="h-8 w-8 text-white" />,
      title: "Track Expenses Effortlessly",
      description: "Easily log your daily expenses and categorize them to see where your money is going. Stay on top of your spending with minimal effort.",
    },
    {
      icon: <PiggyBank className="h-8 w-8 text-white" />,
      title: "Smart Budgeting",
      description: "Create custom budgets for different categories and get notified when you're approaching your limits. Plan your finances and save more effectively.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      title: "Visualize Your Spending",
      description: "Get a clear picture of your financial habits with insightful charts and reports. Understand your spending patterns to make smarter decisions.",
    },
  ];

  return (
    <div ref={root} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-14 items-center">
          <a href="/" className="flex items-center space-x-2">
            <PiggyBank className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block">ExpenseTracker</span>
          </a>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
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
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 hero-element">
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
        <section id="features" className="py-20 md:py-32 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Everything You Need for Financial Clarity
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                Our platform is packed with powerful features designed to make managing your money simple and intuitive.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-8 rounded-lg shadow-md feature-card">
                  <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-background">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
