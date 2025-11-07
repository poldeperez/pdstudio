import { useRef } from 'react';
import { useGSAP, ScrollTrigger } from "@/utils/gsap";

export function useIntroAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        const intro = containerRef.current;
        const hero = document.querySelector('.hero');
        
        if (!intro || !hero) return;

        // Pin the hero while intro slides over it
        ScrollTrigger.create({
            trigger: hero,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    });

    return containerRef;
}