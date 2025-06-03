import { useRef, useEffect } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.5,
      alpha: Math.random(),
      dx: (Math.random() - 0.5) * 0.05,
      dy: (Math.random() - 0.5) * 0.05,
      dAlpha: (Math.random() - 0.5) * 0.02,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.x += star.dx;
        star.y += star.dy;
        star.alpha += star.dAlpha;

        // Bounce at edges
        if (star.x < 0 || star.x > width) star.dx *= -1;
        if (star.y < 0 || star.y > height) star.dy *= -1;
        if (star.alpha < 0.1 || star.alpha > 1) star.dAlpha *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

return (
  <canvas
    ref={canvasRef}
    className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
  />
);
}
