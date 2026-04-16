import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Get initial theme before React loads (prevents flash)
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  
  const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
  if (savedTheme) return savedTheme;
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  // Set theme immediately on mount
  useEffect(() => {
    const initialTheme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);
    setThemeState(initialTheme);
    setMounted(true);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return;
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    
    // Add transition class for smooth theme switching
    document.documentElement.classList.add('theme-transition');
    
    // Remove transition class after animation completes
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
    
    return () => clearTimeout(timer);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
