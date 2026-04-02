import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const [glitchText, setGlitchText] = useState('#WEBDEV 2024');

  useEffect(() => {
    const interval = setInterval(() => {
      // Random glitch effect
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      let glitched = '#WEBDEV 2024';
      
      if (Math.random() > 0.7) {
        const positions = [1, 2, 3, 4, 5, 6];
        const pos = positions[Math.floor(Math.random() * positions.length)];
        const char = chars[Math.floor(Math.random() * chars.length)];
        glitched = glitched.substring(0, pos) + char + glitched.substring(pos + 1);
      }
      
      setGlitchText(glitched);
      
      // Reset after short delay
      setTimeout(() => setGlitchText('#WEBDEV 2024'), 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 sm:py-16 section-padding border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-red-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-4 hover:text-red-500 transition-colors"
          >
            B.Herry
          </button>

          {/* Email */}
          <a
            href="mailto:bolatitoheritage25@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            bolatitoheritage25@gmail.com
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-3 mb-8">
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
              { icon: Mail, href: 'mailto:bolatitoheritage25@gmail.com', label: 'Email' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-foreground/5 dark:bg-white/10 hover:bg-foreground/10 dark:hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-border mb-8" />

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
            <span className="font-mono tracking-wider">{glitchText}</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by Bolatito Heritage
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
