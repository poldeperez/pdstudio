import { useRef } from "react";
import { gsap, useGSAP } from "@/utils/gsap";

export function useServicesPageAnimation() {
  const introRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (introRef.current) {
      const title = introRef.current.querySelector('h2');
      const subtitle = introRef.current.querySelector('p');

      gsap.from(title, {
        opacity: 0,
        y: 30,
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
  });

  return { introRef };
}