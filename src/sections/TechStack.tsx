import { useEffect, useRef, useState } from 'react';

interface Tech {
  name: string;
  image: string;
  description: string;
}

const technologies: Tech[] = [
  {
    name: 'HTML5',
    image: '/html.png',
    description: 'Semantic markup',
  },
  {
    name: 'CSS3',
    image: '/css.png',
    description: 'Styling & layouts',
  },
  {
    name: 'JavaScript',
    image: '/javascript.png',
    description: 'Dynamic functionality',
  },
  {
    name: 'Tailwind CSS',
    image: '/tailwind.png',
    description: 'Utility-first CSS',
  },
  {
    name: 'React.js',
    image: '/react.png',
    description: 'UI library',
  },
  {
    name: 'Next.js',
    image: '/Nextjs.png',
    description: 'React framework',
  },
];

function TechCard({ tech, index }: { tech: Tech; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative p-6 sm:p-8 rounded-3xl bg-card border border-border transition-all duration-300 ${
          isHovered ? 'scale-105 shadow-xl' : 'shadow-md'
        }`}
        style={{
          boxShadow: isHovered ? '0 0 30px rgba(0,0,0,0.15)' : undefined,
        }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
        >
          <img
            src={tech.image}
            alt={`${tech.name} logo`}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        </div>

        {/* Content */}
        <h3 className="text-lg sm:text-xl font-bold mb-1">{tech.name}</h3>
        <p className="text-sm text-muted-foreground">{tech.description}</p>

        {/* Hover Glow Effect */}
        <div
          className={`absolute inset-0 rounded-3xl transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-10 sm:py-24 section-padding overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-foreground/5 dark:bg-white/10 text-sm font-medium mb-4">
            Skills & Technologies
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">
            My Tech Stack
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies I use to build modern, responsive, and performant web applications
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {technologies.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>

        {/* Additional Info */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-sm text-muted-foreground">
            Always learning and exploring new technologies to stay at the forefront of web development
          </p>
        </div>
      </div>
    </section>
  );
}
