
"use client";

import { BotMessageSquare, Gem, GanttChartSquare, Sparkles, Siren, Group } from "lucide-react";
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CurrencyFall } from "@/components/currency-fall";
import { cn } from "@/lib/utils";

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
      
      gsap.from(".video-section-element", {
        opacity: 0,
        y: 30,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".video-section",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        }
      });

      const cards = gsap.utils.toArray('.feature-card');
      cards.forEach((card, index) => {
        let animationProps = {};
        if (index % 3 === 0) { 
          animationProps = { x: -100 };
        } else if (index % 3 === 1) { 
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
      icon: <BotMessageSquare className="h-8 w-8 text-primary-foreground" />,
      title: "AI Financial Co-Pilot",
      description: "Chat with your personal AI to get insights, ask questions, and receive proactive advice on your spending.",
    },
    {
      icon: <Gem className="h-8 w-8 text-primary-foreground" />,
      title: "Gamified Savings Goals",
      description: "Turn saving money into a fun quest. Level up, unlock achievements, and visualize your progress as you reach your goals.",
    },
    {
      icon: <GanttChartSquare className="h-8 w-8 text-primary-foreground" />,
      title: "Predictive Spending",
      description: "Our AI learns your habits to predict upcoming bills and expenses, helping you plan ahead and avoid surprises.",
    },
  ];

  return (
    <div ref={root} className="min-h-screen text-foreground overflow-x-hidden bg-background">
      <main>
        {/* Hero Section */}
        <section className="py-24 sm:py-32 relative isolate overflow-hidden">
          <div className="absolute inset-0 bg-background -z-10">
            <div className="light-mode-hidden">
              <CurrencyFall />
            </div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 hero-element">
              Finally, an Expense Tracker That Works For You
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 hero-element" style={{animationDelay: '1s'}}>
              Go beyond simple logs. BudgetWise uses AI to help you save smarter, achieve your goals, and build a better financial future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-element">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-semibold w-full sm:w-auto">
                Get Started for Free
              </button>
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-semibold w-full sm:w-auto">
                See it in Action
              </button>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 md:py-32 video-section">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16 video-section-element">
              <h2 className="text-3xl md:text-4xl font-bold">
                See BudgetWise in Action
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                Watch a quick overview of how our key features can transform your financial life.
              </p>
            </div>
            <div className="max-w-4xl mx-auto video-section-element">
                <div className="aspect-video bg-card rounded-lg shadow-2xl border overflow-hidden">
                    <video className="w-full h-full" controls poster="https://placehold.co/1920x1080.png" data-ai-hint="finance dashboard">
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                An entirely new way to manage your money.
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                BudgetWise isn't just another spreadsheet. It's a powerful, personalized financial co-pilot.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className={cn("bg-card p-8 rounded-lg shadow-lg feature-card")}>
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


        {/* Bento Box Section */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Your Financial Command Center</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                All the tools you need, beautifully organized and powered by AI.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-6 bento-grid">
              <div className="md:col-span-2 row-span-2 p-8 bg-card rounded-lg shadow-lg flex flex-col justify-center items-center text-center bento-item border">
                  <BotMessageSquare className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">AI Co-Pilot</h3>
                  <p className="text-muted-foreground">"How much did I spend on coffee last month?" Just ask. Get instant answers and proactive financial advice through a simple chat interface.</p>
              </div>
              <div className="p-8 bg-card rounded-lg shadow-lg flex flex-col justify-center items-center text-center bento-item border">
                  <Gem className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Gamified Goals</h3>
                  <p className="text-muted-foreground">Turn saving into a rewarding game.</p>
              </div>
              <div className="p-8 bg-card rounded-lg shadow-lg flex flex-col justify-center items-center text-center bento-item border">
                  <Sparkles className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Mindful Spending</h3>
                  <p className="text-muted-foreground">Score purchases on happiness to align spending with your values.</p>
              </div>
               <div className="md:col-span-1 p-8 bg-card rounded-lg shadow-lg flex flex-col justify-center items-center text-center bento-item border">
                  <Siren className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Smart Alerts</h3>
                  <p className="text-muted-foreground">Get notified before you overspend with predictive bill reminders.</p>
              </div>
              <div className="md:col-span-2 p-8 bg-card rounded-lg shadow-lg flex flex-col justify-center items-center text-center bento-item border">
                  <Group className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Collaborative Budgeting</h3>
                  <p className="text-muted-foreground">Manage shared finances with a partner or family, with options for joint and personal expense tracking.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 border-t bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} BudgetWise. All rights reserved.</p>
          </div>
      </footer>
      <style jsx>{`
        .light-mode-hidden {
          display: none;
        }
        .dark .light-mode-hidden {
          display: block;
        }
        .dark-mode-hidden {
          display: block;
        }
        .dark .dark-mode-hidden {
          display: none;
        }
      `}</style>
    </div>
  );
}
