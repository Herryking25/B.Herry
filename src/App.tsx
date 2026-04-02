import { ThemeProvider } from '@/hooks/useTheme';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import TechStack from '@/sections/TechStack';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background text-foreground grain">
        <Navbar />
        <main>
          <Hero />
          <TechStack />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
