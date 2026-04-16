import { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions, Engine } from "@tsparticles/engine";
import { useTheme } from "@/hooks/useTheme";

export default function ParticlesBackground() {
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      detectRetina: true,
      fpsLimit: 40,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: ["repulse", "bubble"],
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
            factor: 95,
            speed: 1,
            maxSpeed: 150,
            easing: "ease-out-quad",
          },
          bubble: {
            distance: 100,
            size: 8,
            duration: 2,
            opacity: 1.8,
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: theme === "dark" ? "#6846ff" : "#5a3ce8",
        },
        links: {
          color:
            theme === "dark"
              ? "rgba(104, 70, 255, 0.2)"
              : "rgba(90, 60, 232, 0.15)",
          distance: 150,
          enable: true,
          opacity: 2.4,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 4,
            minimumValue: 0.5,
          },
        },
      },
      background: {
        color: "transparent",
      },
    }),
    [theme],
  );

  return (
    <div className="particles-container">
      <Particles id="tsparticles" options={options} className="w-full h-full" />
    </div>
  );
}
