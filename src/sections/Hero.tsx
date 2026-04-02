import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / 25;
      const y = (e.clientY - centerY) / 25;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding pt-24 pb-10"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float animation-delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-float animation-delay-300" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 dark:bg-white/10 border border-foreground/10 dark:border-white/10 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Available for work</span>
            </div>

            {/* Headline */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <span className="block">I'm a</span>
              <span className="block text-gradient-accent">Front-End</span>
              <span className="block">Developer.</span>
            </h1>

            {/* Description */}
            <p
              className={`text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              My name is <span className="font-semibold text-foreground">Bolatito Heritage</span>,
              an experienced web developer passionate about building modern and responsive web experiences.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <Button
                size="lg"
                onClick={scrollToContact}
                className="group bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span>Contact Me</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-full px-8 py-6 text-base font-medium border-2 hover:bg-foreground/5 dark:hover:bg-white/5 transition-all duration-300"
              >
                View Projects
              </Button>
            </div>

            {/* Social Links */}
            <div
              className={`flex items-center gap-4 justify-center lg:justify-start transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <span className="text-sm text-muted-foreground">Follow me:</span>
              <div className="flex items-center gap-2">
                {[
                  { icon: Github, href: 'https://github.com', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-foreground/5 dark:bg-white/10 hover:bg-foreground/10 dark:hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`order-1 lg:order-2 relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
          >
            <div
              ref={imageRef}
              className="relative perspective-1000"
              style={{
                transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-image.png"
                  alt="Bolatito Heritage - Front-End Developer"
                  className="w-full h-full object-cover"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500/20 rounded-2xl backdrop-blur-xl border border-white/20 animate-float" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/20 rounded-full backdrop-blur-xl border border-white/20 animate-float animation-delay-300" />

              {/* Code Snippet Card */}
              <div className="absolute -bottom-4 right-4 sm:right-8 bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20 dark:border-white/10 animate-float animation-delay-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                </div>
                <code className="text-xs sm:text-sm font-mono text-muted-foreground">
                  <span className="text-purple-500">const</span>{' '}
                  <span className="text-blue-500">developer</span> = {'{'}
                  <br />
                  &nbsp;&nbsp;name: <span className="text-green-500">'B.Herry'</span>,
                  <br />
                  &nbsp;&nbsp;skills: <span className="text-orange-500">['React', 'Next.js']</span>
                  <br />
                  {'}'};
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
