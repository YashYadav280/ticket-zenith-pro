import { Calendar, Users, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: "Event Management",
      description: "Create and manage events with ease. Set capacity, dates, and track registrations.",
    },
    {
      icon: Users,
      title: "Attendee Experience",
      description: "Browse events, book tickets instantly, and access digital passes with QR codes.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track event performance, monitor check-ins, and view detailed analytics.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-overlay opacity-20" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center animate-fade-in">
            <div className="mb-6 flex items-center justify-center gap-3">
              <Calendar className="h-12 w-12 text-white" />
              <h1 className="text-5xl font-bold text-white lg:text-6xl">
                EventHub
              </h1>
            </div>
            
            <p className="mb-8 text-xl text-white/90 lg:text-2xl">
              Your Complete Event Management Solution
            </p>
            
            <p className="mb-10 text-lg text-white/80">
              Create amazing events, manage attendees, and track success with our all-in-one platform.
              From booking to check-in, we've got you covered.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                onClick={() => navigate("/auth")}
                variant="accent"
                size="xl"
                className="gap-2 text-lg shadow-elegant"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features for organizers and attendees
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 transition-all duration-300 hover:shadow-elegant hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join EventHub today and transform how you manage events
            </p>
            <Button
              onClick={() => navigate("/auth")}
              variant="gradient"
              size="xl"
              className="gap-2"
            >
              Sign Up Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 EventHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
