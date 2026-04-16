import { useEffect, useRef } from 'react';
import {
  Code2,
  Palette,
  GitBranch,
  Figma,
  FileType,
  Layout,
  Smartphone,
  Database,
  Layers,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import gsap from 'gsap';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: [
      { name: 'HTML5', level: 95, icon: Layout },
      { name: 'CSS3', level: 92, icon: Palette },
      { name: 'JavaScript', level: 90, icon: Code2 },
      { name: 'TypeScript', level: 85, icon: FileType },
    ],
  },
  {
    title: 'Frameworks',
    icon: Layers,
    skills: [
      { name: 'React.js', level: 88, icon: Code2 },
      { name: 'React Native', level: 80, icon: Smartphone },
      { name: 'Tailwind CSS', level: 92, icon: Palette },
      { name: 'Bootstrap', level: 85, icon: Layout },
    ],
  },
  {
    title: 'Tools & Design',
    icon: GitBranch,
    skills: [
      { name: 'Git & GitHub', level: 88, icon: GitBranch },
      { name: 'Figma', level: 82, icon: Figma },
      { name: 'Responsive Design', level: 95, icon: Layout },
      { name: 'REST APIs', level: 85, icon: Database },
    ],
  },
];

function SkillBar({ name, level, icon: Icon, delay }: { name: string; level: number; icon: React.ElementType; delay: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium text-sm">{name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${level}%` : '0%',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="glass rounded-2xl p-6 lg:p-8 card-hover group"
      style={{ perspective: '1000px' }}
    >
      {/* Card Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <category.icon className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{category.title}</h3>
          <span className="text-sm text-muted-foreground">
            {category.skills.length} technologies
          </span>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-5">
        {category.skills.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            icon={skill.icon}
            delay={skillIndex * 100}
          />
        ))}
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/10 to-transparent" />
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-primary font-medium mb-4">
            My Skills
          </span>
          <h2 className="text-responsive-section font-bold mb-4">
            My <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive set of tools and technologies I use to bring ideas to life.
            Constantly learning and adapting to new technologies.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto mt-6" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold mb-6">Other Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Redux',
              'Next.js',
              'Webpack',
              'Vite',
              'Sass',
              'Styled Components',
              'Jest',
              'Cypress',
              'npm/yarn',
              'VS Code',
              'Postman',
              'Vercel',
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
