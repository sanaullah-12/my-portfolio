import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const navLinks = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollToSection } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass py-3 shadow-lg shadow-black/5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center group"
            >
              <img
                src="/images/mylogo.png"
                alt="Sanaullah logo"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 group-hover:w-3/4 transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2.5 rounded-xl glass hover:bg-white/5 transition-all duration-300 group"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div className="relative w-5 h-5">
                  <Sun 
                    className={`w-5 h-5 absolute inset-0 text-amber-500 transition-all duration-500 ${
                      theme === 'dark' 
                        ? 'opacity-0 rotate-90 scale-0' 
                        : 'opacity-100 rotate-0 scale-100'
                    }`} 
                  />
                  <Moon 
                    className={`w-5 h-5 absolute inset-0 text-slate-400 transition-all duration-500 ${
                      theme === 'dark' 
                        ? 'opacity-100 rotate-0 scale-100' 
                        : 'opacity-0 -rotate-90 scale-0'
                    }`} 
                  />
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl glass hover:bg-white/5 transition-all duration-300"
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5">
                  <X 
                    className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
                      isMobileMenuOpen 
                        ? 'opacity-100 rotate-0' 
                        : 'opacity-0 rotate-90'
                    }`} 
                  />
                  <Menu 
                    className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
                      isMobileMenuOpen 
                        ? 'opacity-0 -rotate-90' 
                        : 'opacity-100 rotate-0'
                    }`} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-20 left-4 right-4 glass-strong rounded-2xl p-6 transition-all duration-500 ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-3 text-left text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-all duration-300"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
