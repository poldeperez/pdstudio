import { useRef } from "react";
import { gsap, useGSAP } from "@/utils/gsap";

export function useContactAnimation() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero animations
    if (heroRef.current) {
      const title = heroRef.current.querySelector('h1');
      const subtitle = heroRef.current.querySelector('p');

      // ✅ Animate from hidden state
      gsap.from(title, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        delay: 0.3,
      });

      gsap.from(subtitle, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
    }

    // Form section animation
    if (formRef.current) {
      const formColumn = formRef.current.querySelector(`.formColumn`);
      const infoColumn = formRef.current.querySelector(`.infoColumn`);

      gsap.from(formColumn, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(infoColumn, {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }
  });

  return { heroRef, formRef, infoRef };
}