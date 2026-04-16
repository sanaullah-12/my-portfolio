import { useEffect, useRef, useState } from "react";
import { Briefcase, Users, Clock, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import gsap from "gsap";

const stats = [
  { icon: Briefcase, value: 3, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 10, suffix: "+", label: "Projects Completed" },
  { icon: Clock, value: 24, suffix: "/7", label: "Support" },
  { icon: Award, value: 100, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>({
    threshold: 0.5,
  });

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, clipPath: "circle(0% at 50% 50%)" },
        {
          opacity: 1,
          scale: 1,
          clipPath: "circle(100% at 50% 50%)",
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Content animation
      gsap.fromTo(
        ".about-content",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      // Stats animation
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-primary font-medium mb-4">
            About Me
          </span>
          <h2 className="text-responsive-section font-bold mb-4">
            Get To Know <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="relative flex justify-center">
            {/* Rotating Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
            </div>

            {/* Main Image */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden glass-strong">
              <img
                src="/images/profile.png"
                alt="Sanaullah"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            {/* Decorative Dots */}
            <div className="absolute -top-4 -right-4 grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/40"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          {/* Content Column */}
          <div className="about-content">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">
              Building Modern Interfaces That Create{" "}
              <span className="gradient-text">Real Impact</span>
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                I'm Sanaullah, a frontend developer with over 3 years of
                experience designing and building responsive web applications
                that are both functional and visually refined. I focus on
                turning ideas into polished digital experiences that feel
                intuitive, fast, and reliable.
              </p>
              <p>
                My work centers on modern frontend technologies such as React,
                TypeScript, and Tailwind CSS. I care deeply about clean code,
                maintainable architecture, and interfaces that deliver a smooth
                experience across all devices.
              </p>
              <p>
                I value collaboration, clear communication, and continuous
                improvement. Whether I'm refining user interactions, optimizing
                performance, or learning new tools, I aim to contribute
                thoughtful solutions that support business goals and user needs.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "Problem Solver",
                "Team Player",
                "Detail Oriented",
                "Adaptable",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full glass text-sm font-medium text-foreground hover:bg-primary/10 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card glass rounded-2xl p-6 text-center card-hover group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold gradient-text mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
