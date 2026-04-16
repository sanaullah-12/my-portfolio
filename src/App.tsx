import { useEffect } from 'react';
import { ThemeProvider } from '@/hooks/useTheme';
import { useVisitorNotification } from '@/hooks/useVisitorNotification';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import './App.css';

// Visitor notification wrapper component
function VisitorNotifier() {
  useVisitorNotification();
  return null;
}

function App() {
  // Initialize smooth scroll behavior
  useEffect(() => {
    // Add class to body for smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.slice(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <ThemeProvider>
      <VisitorNotifier />
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Global Background Gradient */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
        </div>

        {/* Noise Texture Overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none noise-overlay opacity-50" />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
