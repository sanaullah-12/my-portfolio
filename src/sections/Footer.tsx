import { Github, Linkedin, Twitter, Instagram, Heart, ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

const quickLinks = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
];

export default function Footer() {
  const { scrollToSection } = useSmoothScroll();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-16 pb-8 overflow-hidden">
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold gradient-text">Sanaullah</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Frontend Developer passionate about creating beautiful, functional,
              and user-friendly web experiences. Let's build something amazing together.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl glass hover:bg-primary/20 transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>qazisanaullah612@gmail.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} Sanaullah. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> using React &
              Tailwind
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => scrollToSection('home')}
        className="fixed bottom-6 right-6 p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110 group z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>
    </footer>
  );
}
