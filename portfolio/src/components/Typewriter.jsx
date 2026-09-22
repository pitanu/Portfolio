import { useEffect, useState } from "react";

export default function Typewriter({ lines = [], speed = 1000, pause = 1000 }) {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lines.length === 0) return;

    const currentLine = lines[lineIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayed(currentLine.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setLineIndex((prev) => (prev + 1) % lines.length);
        }
      }, speed);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(currentLine.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex === currentLine.length) {
          setIsDeleting(true);
        }
      }, charIndex === currentLine.length ? pause : speed);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, lineIndex, lines, speed, pause]);

  return (
    <div className="w-full flex justify-center items-center">
      <p className="sr-only">{lines.join(", ")}</p>
      <p aria-hidden="true" className="text-4xl font-bold whitespace-pre-wrap">
        {displayed}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
}
