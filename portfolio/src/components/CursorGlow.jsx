import { useEffect, useRef } from "react";

const SIZE = 320;

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    let frameId;
    let x = -SIZE;
    let y = -SIZE;
    let targetX = -SIZE;
    let targetY = -SIZE;

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      x += (targetX - x) * 0.1;
      y += (targetY - y) * 0.1;
      el.style.transform = `translate(${x - SIZE / 2}px, ${y - SIZE / 2}px)`;
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-[5] rounded-full"
      style={{
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle, rgba(129,140,248,0.13) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)",
      }}
    />
  );
}
