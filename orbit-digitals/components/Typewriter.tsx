"use client";
import { useState, useEffect } from "react";

const phrases = ["moves customers", "scales brands", "captures leads"];

export default function Typewriter() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100); // Matches prototype speed

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      // Speed logic matching your prototype
      if (isDeleting) {
        setTypingSpeed(50); // Fast delete
      } else {
        setTypingSpeed(100); // Normal type
      }

      if (!isDeleting && text === fullText) {
        setTypingSpeed(2000); // Pause at end of word
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before next word
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="text-[#3CB7FF] font-bold inline-block min-w-[120px] text-left">
      {text}
      <span className="animate-pulse ml-0.5 text-[#3CB7FF]">|</span>
    </span>
  );
}