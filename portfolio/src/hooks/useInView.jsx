import { useState, useEffect, useRef } from "react";

export function useInView(options) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Animate once
        }
      },
      { threshold: 0.2, ...options }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, isInView];
}
