import { useRef, useEffect } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.5,
      alpha: Math.random(),
      dx: (Math.random() - 0.5) * 0.05,
      dy: (Math.random() - 0.5) * 0.05,
      dAlpha: (Math.random() - 0.5) * 0.02,
    }));

    let animationFrameId;

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.x += star.dx;
        star.y += star.dy;
        star.alpha += star.dAlpha;

        if (star.x < 0 || star.x > width) star.dx *= -1;
        if (star.y < 0 || star.y > height) star.dy *= -1;
        if (star.alpha < 0.1 || star.alpha > 1) star.dAlpha *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      }
    };

    const animate = () => {
      drawFrame();
      animationFrameId = requestAnimationFrame(animate);
    };

    if (prefersReducedMotion) {
      drawFrame();
    } else {
      animate();
    }

    const handleResize = () => {
      resizeCanvas();
      if (prefersReducedMotion) {
        drawFrame();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
    />
  );
}
