import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Fantasy Baller League',
    description: 'A comprehensive fantasy basketball league platform featuring real-time player statistics, team management, live game updates, and competitive rankings. Built with modern web technologies for an immersive gaming experience.',
    image: '/project-1.png',
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://fantasyballerleague.netlify.app/',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 2,
    name: 'E-Commerce Dashboard',
    description: 'A modern e-commerce management dashboard with product catalog, order tracking, payment integration, and analytics. Features a clean UI with real-time data visualization.',
    image: '/project-2.png',
    techStack: ['Next.js', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    liveUrl: 'https://king-shop-murex.vercel.app/',
    githubUrl: 'https://github.com',
  },
  {
    id: 3,
    name: 'Junction Community Website',
    description: 'Designed and developed a complete web platform with an integrated admin dashboard, implementing secure authentication and role-based access to manage events, media, and community content in real time, with updates reflected instantly on the live site.',
    image: '/project-3.png',
    techStack: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
    liveUrl: 'https://junctionwebsite.netlify.app/',
  },
  {
    id: 4,
    name: 'Vineyard Catering Website',
    description: 'Designed and developed a modern, responsive catering service website that showcases services, menu offerings, and event galleries, with a streamlined booking system that makes it easy for customers to request quotes and connect with the business.',
    image: '/project-4.png',
    techStack: ['React.js', 'Tailwind CSS', 'EmailJS'],
    liveUrl: 'https://vineyard-catering-service.vercel.app/',
    githubUrl: 'https://github.com',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
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
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-3xl bg-card border border-border transition-all duration-500 ${
          isHovered ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'
        }`}
      >
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
              Featured
            </div>
          )}
          
          {/* Hover Actions */}
          <div
            className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Button
              size="sm"
              className="bg-white text-black hover:bg-white/90 rounded-full px-6"
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            {project.githubUrl && (
              <Button
                size="sm"
                variant="outline"
                className="border-white text-white hover:bg-white/20 rounded-full px-6"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold group-hover:text-red-500 transition-colors">
              {project.name}
            </h3>
            <ArrowUpRight
              className={`w-5 h-5 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-x-0 -translate-y-0' : 'opacity-0 -translate-x-2 translate-y-2'
              }`}
            />
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/5 dark:bg-white/10 text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-foreground/5 dark:bg-white/10 text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing my skills in front-end development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-base font-medium border-2 hover:bg-foreground/5 dark:hover:bg-white/5 transition-all duration-300"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Github className="w-4 h-4 mr-2" />
            View More on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
