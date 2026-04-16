import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import gsap from "gsap";

const projects = [
  {
    id: 1,
    title: "Analytics Dashboard Pro",
    description:
      "A comprehensive analytics dashboard for e-commerce businesses. Features real-time data visualization, sales tracking, customer insights, and customizable reports. Built with React and D3.js for interactive charts.",
    image: "/images/project-1.jpg",
    tech: ["React", "TypeScript", "Tailwind CSS", "D3.js", "Node.js"],
    liveUrl: "https://analytics-dashbaord-beta.vercel.app/",
    githubUrl: "https://github.com/sanaullah-12/Analytics-Dashbaord",
    featured: true,
  },
  {
    id: 2,
    title: "Crypto exchange dashboard overview",
    description:
      "A modern and responsive Crypto Exchange Dashboard built to display real-time cryptocurrency data with a clean, user-friendly interface.The application provides an intuitive overview of the crypto market using interactive cards, live price updates, and detailed analytics charts.",
    image: "../../public/images/cryptoexchange.png",
    tech: ["React", "Redux", "Firebase", "Tailwind CSS", "React DnD"],
    liveUrl: "https://sunnycryptoapp.netlify.app/",
    githubUrl: "https://github.com/sanaullah-12/mycryptoapp",
    featured: true,
  },
  {
    id: 3,
    title: "ShopSphere E-Commerce Store",
    description:
      "A modern e-commerce storefront with product browsing, category filtering, cart functionality, and a streamlined checkout experience. Designed for responsive shopping across desktop and mobile devices.",
    image: "/images/project-3.png",
    tech: ["React", "TypeScript", "Tailwind CSS", "Redux", "REST API"],
    liveUrl: "https://e-commerce-website-pearl-gamma.vercel.app/",
    githubUrl: "https://github.com/sanaullah-12/E-commerce-website",
    featured: true,
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      },
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative glass rounded-2xl overflow-hidden card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 lg:h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold">
            Featured
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center gap-4 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white text-background hover:scale-110 transition-transform"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white text-background hover:scale-110 transition-transform"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-white/20 hover:bg-primary/10 hover:border-primary/50"
            asChild
          >
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-white/20 hover:bg-primary/10 hover:border-primary/50"
            asChild
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLDivElement>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />

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
            Portfolio
          </span>
          <h2 className="text-responsive-section font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing my skills in frontend
            development, UI/UX design, and problem-solving.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto mt-6" />
        </div>

        {/* Navigation Arrows (Desktop) */}
        <div className="hidden lg:flex justify-end gap-2 mb-6">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Projects Grid */}
        <div
          ref={scrollContainerRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-white/20 hover:bg-primary/10 hover:border-primary/50 px-8"
            asChild
          >
            <a
              href="https://github.com/sanaullah-12"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
