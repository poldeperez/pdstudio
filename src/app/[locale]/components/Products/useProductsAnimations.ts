import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from "@/utils/gsap";

export function useProductsAnimations() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    
    useGSAP(() => {
        console.log('Products animation initialized');
        console.log('Rows found:', gsap.utils.toArray('.row').length);
        console.log('Cards left found:', document.querySelectorAll('.card-left').length);
        console.log('Cards right found:', document.querySelectorAll('.card-right').length);
        const scrollTriggerSettings = {
            trigger: ".main",
            start: "top 25%",
            toggleActions: "play reverse play reverse" as const,
            pinSpacing: true
        };

        const leftXValues = [-800, -900, -400];
        const rightXValues= [800, 900, 400];
        const leftRotationValues = [-30, -20, -35];
        const rightRotationValues = [30, 20, 35];
        const yValues = [100, -150, -400];

        gsap.utils.toArray<HTMLElement>(".row").forEach((row, index) => {
            const cardLeft = row.querySelector<HTMLElement>(".card-left");
            const cardRight = row.querySelector<HTMLElement>(".card-right");

            if (cardLeft && cardRight) {
                gsap.to(cardLeft, {
                    x: leftXValues[index],
                    scrollTrigger: {
                        trigger: ".main",
                        start: "top center",
                        end: "150% bottom",
                        scrub: true,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            cardLeft.style.transform = `translateX(${progress * leftXValues[index]}px) translateY(${progress *yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`;
                            cardRight.style.transform = `translateX(${progress * rightXValues[index]}px) translateY(${progress *yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`;                   
                        }
                    }

                });
            }
        });

        gsap.to(".logo", {
            scale: 1,
            duration: 0.5,
            ease: "power1.out",
            scrollTrigger: scrollTriggerSettings,
        });

        gsap.to(".line p", {
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power1.out",
            scrollTrigger: scrollTriggerSettings,
        });

        gsap.to(".button", {
            y: 0,
            opacity: 1,
            delay: 0.25,
            scale: 1,
            duration: 0.5,
            ease: "power1.out",
            scrollTrigger: scrollTriggerSettings,
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        }
    });

    return containerRef;
}