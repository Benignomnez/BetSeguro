"use client";

import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  element?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
}

export default function AnimatedText({
  text,
  className = "",
  element = "p",
}: AnimatedTextProps) {
  const [currentText, setCurrentText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (text !== currentText) {
      setIsAnimating(true);

      // Simple CSS transition - the actual transition is handled by CSS
      const timer = setTimeout(() => {
        setCurrentText(text);
        setIsAnimating(false);
      }, 150); // Half of the total transition time

      return () => clearTimeout(timer);
    }
  }, [text, currentText]);

  const Element = element;

  // The animation is handled with CSS classes
  const animationClass = isAnimating
    ? "opacity-0 transform translate-y-2"
    : "opacity-100 transform translate-y-0";

  return (
    <Element
      className={`${className} ${animationClass} transition-all duration-300`}
    >
      {currentText}
    </Element>
  );
}
