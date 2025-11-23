import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, SplitText } from "@/utils/gsap";

export function useServicesAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const cardElements = gsap.utils.toArray<HTMLElement>(".card");
    const introH2 = containerRef.current.querySelector('.services-intro h2');

    // Animate intro h2 letters rising from bottom with SplitText
    if (introH2) {
      // Split text into characters
      const split = new SplitText(introH2, { 
        type: "chars",
        charsClass: "services-letter"
      });
      
      // Set initial state
      gsap.set(split.chars, {
        y: 100,
        opacity: 0
      });

      // Animate letters rising up
      gsap.to(split.chars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1)",
        scrollTrigger: {
          trigger: '.services-intro',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
    }

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
      const cardInner = card.querySelector<HTMLElement>(".card-inner");
      const cardImg = card.querySelector<HTMLElement>(".cardImg"); // ✅ Get the image container
      const cardTitle = card.querySelector<HTMLElement>(".cardContent h1"); // ✅ Select the h1

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
          }
        });
      }

      // ✅ Animate image sliding in from right and fading in
      if (cardImg) {
        gsap.fromTo(
          cardImg,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // ✅ Animate h1: slide up and fade in
      if (cardTitle) {
        gsap.fromTo(
          cardTitle,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 60%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, { scope: containerRef });

  return containerRef;
}