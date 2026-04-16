import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Github,
  Linkedin,
  ExternalLink,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import ParticlesBackground from "@/components/ParticlesBackground";
import gsap from "gsap";

export default function Hero() {
  const { scrollToSection } = useSmoothScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const fullText =
    "I craft digital experiences that merge art with engineering.";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animations
      gsap.fromTo(
        ".hero-greeting",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" },
      );

      gsap.fromTo(
        ".hero-name",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" },
      );

      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" },
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1, ease: "power3.out" },
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, rotateY: 30 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          delay: 0.5,
          ease: "elastic.out(1, 0.5)",
        },
      );

      // Social links animation
      gsap.fromTo(
        ".social-link",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 1.2,
          ease: "power2.out",
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect for image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;

      gsap.to(imageRef.current, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text */}
          <div
            ref={textRef}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="hero-greeting inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Available for work
              </span>
            </div>

            <h1 className="hero-name text-responsive-hero font-bold leading-tight mb-4">
              Hi, I'm <span className="gradient-text">Sanaullah</span>
            </h1>

            <div className="hero-title mb-6">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground">
                Frontend Developer
              </span>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 h-14">
              {typedText}
              <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                View My Work
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
                asChild
              >
                <a href="/images/Qazi_Sanaullah_Cv.docx" download>
                  Download CV
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {[
                {
                  icon: Github,
                  href: "https://github.com/sanaullah-12",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/qazi-sanaullah-537b8b21a/",
                  label: "LinkedIn",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/mr_qazi_sanauallah_512/",
                  label: "Instagram",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link p-3 rounded-xl glass hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative"
              style={{ perspective: "1000px" }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-purple-500/40 rounded-3xl blur-3xl scale-110 animate-pulse-glow" />

              {/* Rotating Border */}
              <div className="absolute -inset-1 rounded-3xl gradient-border opacity-70">
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-spin-slow"
                  style={{ animationDuration: "8s" }}
                />
              </div>

              {/* Image Container */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[28rem] rounded-3xl overflow-hidden glass-strong group">
                {/* 
                  USER: Replace this image with your own profile photo
                  Recommended: 800x1000px or similar aspect ratio (4:5)
                  Place your image at: /public/images/profile.png
                */}
                <img
                  src="/images/profile.png"
                  alt="Sanaullah"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badges */}
              <div
                className="absolute -bottom-4 -left-4 glass-strong px-4 py-2 rounded-xl animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="text-sm font-semibold gradient-text">
                  3+ Years
                </span>
                <span className="text-xs text-muted-foreground block">
                  Experience
                </span>
              </div>

              <div
                className="absolute -top-4 -right-4 glass-strong px-4 py-2 rounded-xl animate-float"
                style={{ animationDelay: "1s" }}
              >
                <span className="text-sm font-semibold gradient-text">10+</span>
                <span className="text-xs text-muted-foreground block">
                  Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group z-10"
      >
        <span className="text-sm">Scroll Down</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
