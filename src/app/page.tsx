
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, TrendingUp, BarChart, Lightbulb, ShieldCheck, Users } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import Image from 'next/image';

const features = [
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Monthly Budget Setting',
    description: 'Set a clear base budget for each month to stay on track.',
    aiHint: 'finance planning',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Subcategory Management',
    description: 'Organize expenses with customizable subcategories like food, transport, and entertainment.',
    aiHint: 'categories organization',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'Expense Tracking',
    description: 'Easily add and monitor your expenses in real-time.',
    aiHint: 'data entry',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Budget Tips',
    description: 'Receive smart, AI-driven advice to optimize your spending and save more.',
    aiHint: 'artificial intelligence',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Budget Monitoring & Alerts',
    description: 'Stay informed with real-time budget status and get alerts before you overspend.',
    aiHint: 'notifications alert',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-cyan-200 dark:from-background dark:to-teal-900">
      <SiteHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1200x600.png?a=finance+abstract')" }} data-ai-hint="finance abstract">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="container relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-slide-in [animation-delay:0.2s]">
              Welcome to <span className="text-gradient-primary bg-gradient-to-r from-accent to-orange-400">BudgetWise</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto animate-slide-in [animation-delay:0.4s]">
              Take control of your finances. Track expenses, set budgets, and achieve your financial goals with AI-powered insights.
            </p>
            <div className="space-x-4 animate-fade-in [animation-delay:0.6s]">
              <Button size="lg" asChild className="gradient-accent text-accent-foreground hover:opacity-90 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Why Choose <span className="text-gradient-primary">BudgetWise</span>?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 animate-fade-in" style={{animationDelay: `${0.2 * (index + 1) + 0.6}s`}}>
                  <CardHeader className="items-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
              Simple Steps to Financial Clarity
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Set Your Budget", description: "Define your monthly and category-wise budgets easily.", icon: <CheckCircle className="h-10 w-10 mx-auto mb-4 text-accent" />, aiHint: "budget setup" },
                { title: "Track Expenses", description: "Log your spending on the go, anytime, anywhere.", icon: <CheckCircle className="h-10 w-10 mx-auto mb-4 text-accent" />, aiHint: "expense logging" },
                { title: "Gain Insights", description: "Understand your spending habits with clear reports and AI tips.", icon: <CheckCircle className="h-10 w-10 mx-auto mb-4 text-accent" />, aiHint: "financial report" }
              ].map((step, index) => (
                <div key={index} className="p-6 rounded-lg animate-fade-in" style={{animationDelay: `${0.2 * index + 1.8}s`}}>
                  <div className="mb-4">
                    <Image src={`https://placehold.co/300x200.png`} alt={step.title} width={300} height={200} className="rounded-lg shadow-md mx-auto" data-ai-hint={step.aiHint} />
                  </div>
                  {step.icon}
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 md:py-32 text-center gradient-primary text-primary-foreground">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master Your Money?</h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Start taking control of your financial future with BudgetWise today.
            </p>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 hover:text-white transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
