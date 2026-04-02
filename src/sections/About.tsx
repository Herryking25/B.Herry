import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Code2, Palette, Zap, Globe } from 'lucide-react';

const skills = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code with best practices',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive and visually appealing interfaces',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing for speed and smooth user experiences',
  },
  {
    icon: Globe,
    title: 'Responsive',
    description: 'Building websites that work on all devices',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageMask, setImageMask] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      setImageMask(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div
            ref={imageRef}
            className={`relative order-2 lg:order-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
          >
            <div
              className="relative aspect-square max-w-md mx-auto lg:mx-0 overflow-hidden"
              style={{
                clipPath: `inset(0% ${Math.max(0, 30 - imageMask * 30)}% 0% ${Math.max(0, 30 - imageMask * 30)}% round ${30 - imageMask * 20}px)`,
                transition: 'clip-path 0.1s ease-out',
              }}
            >
              <img
                src="/about-image.png"
                alt="Bolatito Heritage"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-red-500/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-500/10 rounded-full blur-xl -z-10" />

            {/* Experience Badge */}
            <div className="absolute -bottom-6 right-4 sm:right-8 bg-white dark:bg-black rounded-2xl p-4 shadow-xl border border-border animate-float">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold text-gradient-accent">3+</span>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            {/* Section Label */}
            <div
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-foreground/5 dark:bg-white/10 text-sm font-medium mb-4">
                About Me
              </span>
            </div>

            {/* Title */}
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              Crafting Digital
              <span className="text-gradient-accent block">Experiences</span>
            </h2>

            {/* Description */}
            <div
              className={`space-y-4 text-muted-foreground mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <p className="leading-relaxed">
                I'm <span className="font-semibold text-foreground">Bolatito Heritage</span>,
                a passionate front-end developer dedicated to creating seamless user experiences
                using modern web technologies. I specialize in building responsive interfaces that
                bring innovative ideas to life.
              </p>
              <p className="leading-relaxed">
                With a keen eye for design and a love for clean code, I continuously learn new tools
                and techniques to deliver impactful digital solutions. My goal is to bridge the gap
                between design and functionality, creating websites that not only look great but
                perform exceptionally.
              </p>
            </div>

            {/* Skills Grid */}
            <div
              className={`grid grid-cols-2 gap-4 mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              {skills.map((skill, index) => (
                <div
                  key={skill.title}
                  className="flex items-start gap-3 p-3 rounded-xl bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                    <skill.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{skill.title}</h4>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <Button
                size="lg"
                className="group bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = 'data:text/plain;charset=utf-8,Bolatito Heritage - Front-End Developer\n\nContact: bolatitoheritage25@gmail.com\nPhone: +2349132747510';
                  link.download = 'B.Herry_CV.txt';
                  link.click();
                }}
              >
                <Download className="mr-2 w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>Download CV</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
