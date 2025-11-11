import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from "@/utils/gsap";

export function useServicesAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cardElements = gsap.utils.toArray<HTMLElement>(".card");

    // Pin intro during cards scroll
    ScrollTrigger.create({
      trigger: cardElements[0],
      start: "top 20%",
      endTrigger: cardElements[cardElements.length - 1],
      end: "top 30%",
      pin: ".services-intro",
      pinSpacing: false,
    });

    // Animate each card
    cardElements.forEach((card, index) => {
      const isLastCard = index === cardElements.length - 1;
      const cardInner = card.querySelector<HTMLElement>(".card-inner");

      
      
      ScrollTrigger.create({
        trigger: card,
        start: "top 20%",
        endTrigger: ".services-outro",
        end: "top 50%",
        pin: true,
        pinSpacing: false
      });
      

      if (cardInner) {
        gsap.to(cardInner, {
          y: `-${(cardElements.length - index) * 16}vh`,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 20%",
            endTrigger: ".services-outro",
            end: "top 45%",
            scrub: true,
            markers: true,
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, { scope: containerRef });

  return containerRef;
}