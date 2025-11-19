import { useRef } from "react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/utils/gsap";

export function useIntroAnimation() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const modelTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate main title
    if (titleRef.current) {
      const split = new SplitText(titleRef.current, {
        type: "words",
        wordsClass: "word",
      });

      gsap.from(split.words, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Animate subtitle
    if (subtitleRef.current) {
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    // Animate two columns
    if (columnsRef.current) {
      gsap.to(columnsRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: columnsRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      const columns = columnsRef.current.querySelectorAll(`.column`);
      gsap.from(columns, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: columnsRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }

    // Animate model text with scrub (follows scroll like the 3D model)
    if (modelTextRef.current) {
      // ✅ Phase 1: Text slides in from right
      gsap.from(modelTextRef.current, {
        x: 200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".modelContainer",
          start: "top 20%",
          end: "+=150vh",
          scrub: 1,
          markers: false,
        },
      });

      // ✅ Phase 2 & 3: Keep text pinned during rotation 
      ScrollTrigger.create({
        trigger: ".modelContainer",
        start: "top+=40vh top",
        end: "+=290vh", // ✅ Updated: Pin for phase 2 (200vh) and phase 3
        pin: modelTextRef.current,
        pinSpacing: false,
        markers: false,
      });


      const h2 = modelTextRef.current.querySelector("h2");
      const p = modelTextRef.current.querySelector("p");

      if (h2) {
        gsap.from(h2, {
          y: 30,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".modelContainer",
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }

      if (p) {
        gsap.from(p, {
          y: 30,
          opacity: 0,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".modelContainer",
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }
    }
  });

  return { titleRef, subtitleRef, columnsRef, modelTextRef };
}