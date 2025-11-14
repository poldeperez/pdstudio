import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/utils/gsap";

export function useOutroAnimation() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Animate main title
    if (titleRef.current) {
      const split = new SplitText(titleRef.current, {
        type: "words,chars",
        wordsClass: "word",
        charsClass: "char",
      });

      gsap.from(split.chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Set title visible after split
      gsap.set(titleRef.current, { opacity: 1 });
    }
  });

  return { titleRef };
}