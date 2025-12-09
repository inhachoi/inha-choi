import { useEffect, useRef } from "react";

export const useMouseMove = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay) {
      return;
    }

    let animationFrame: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (4 / 30) * y - 20;
        const rotateY = (-1 / 5) * x + 20;

        overlay.style.backgroundPosition = `${x / 5 + y / 5}%`;
        container.style.transform = `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    const handleMouseOut = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      overlay.style.backgroundPosition = "100%";
      container.style.transform =
        "perspective(400px) rotateX(0deg) rotateY(0deg)";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseout", handleMouseOut);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseout", handleMouseOut);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return { containerRef, overlayRef };
};
