import { Zap, ShieldCheck, Rocket } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Rocket className="h-8 w-8 text-white" />,
      title: "Fast & Efficient",
      description: "Experience blazing-fast performance that keeps up with your demands, ensuring a smooth and responsive user experience.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-white" />,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security. We ensure reliability so you can work with confidence.",
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "Powerful Integrations",
      description: "Seamlessly connect with your favorite tools and services to streamline your workflow and boost your productivity.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              The Future of Productivity is Here
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              An elegant solution designed to streamline your workflow, boost collaboration, and help you achieve your goals faster than ever before.
            </p>
            <div className="space-x-4">
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
                Everything You Need, Nothing You Don't
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                Our platform is packed with powerful features designed to make your life easier.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-8 rounded-lg shadow-md">
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
              <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
