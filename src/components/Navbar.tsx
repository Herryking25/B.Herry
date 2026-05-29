import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Sun, 
  Moon, 
  Download,
  Home,
  User,
  Briefcase,
  Layers,
  Mail
} from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Experience', href: '#experience', icon: Layers },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'top-3 scale-[0.95]' 
            : 'top-4 scale-100'
        }`}
      >
        <div
          className={`relative flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 rounded-full transition-all duration-500 ${
            isScrolled
              ? 'bg-white/80 dark:bg-black/80 backdrop-blur-2xl shadow-glass dark:shadow-glass-dark border border-white/40 dark:border-white/20'
              : 'bg-white/60 dark:bg-black/60 backdrop-blur-xl shadow-glass dark:shadow-glass-dark border border-white/30 dark:border-white/10'
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <span className="text-sm sm:text-base font-bold font-display tracking-tight">
              B.Herry
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {activeSection === link.href.slice(1) && (
                  <span className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full animate-scale-in" />
                )}
                <span className="relative">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-border mx-1" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          {/* Download CV Button - Desktop */}
          <Button
            asChild
            size="sm"
            className="hidden sm:flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <a href="/Heritage_CV.pdf" download="Heritage_CV.pdf">
              <Download className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[90vw] max-w-sm transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="bg-white/90 dark:bg-black/90 backdrop-blur-2xl rounded-3xl shadow-glass dark:shadow-glass-dark border border-white/40 dark:border-white/20 p-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? 'bg-black/5 dark:bg-white/10 text-foreground'
                      : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
              
              <div className="border-t border-border my-2" />
              
              <Button
                asChild
                className="w-full flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 rounded-2xl py-3 text-sm font-medium"
              >
                <a
                  href="/Heritage_CV.pdf"
                  download="Heritage_CV.pdf"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
