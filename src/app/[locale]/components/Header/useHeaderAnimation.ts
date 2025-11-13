import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from "@/utils/gsap";

export function useHeaderAnimation() {
    const headerRef = useRef<HTMLDivElement>(null);
    const companyNameRef = useRef<HTMLDivElement>(null);
    const navLinksRef = useRef<HTMLDivElement>(null);
    const menuBgRef = useRef<HTMLButtonElement>(null);
    const hoverMenuRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        const companyName = companyNameRef.current;
        const navLinks = navLinksRef.current;
        const menuBg = menuBgRef.current;
        const hoverMenu = hoverMenuRef.current;
        
        if (!companyName) return;

        // Set initial state - hidden above
        gsap.set(companyName, {
            y: -20,
            rotationX: -90,
            opacity: 0,
            scale: 0.9,
            visibility: 'visible',
            transformPerspective: 1000,
        });

        // Animate in on scroll
        gsap.to(companyName, {
            y: 0,
            rotationX: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: ".intro",
                start: "top top",
                end: "top+=100 top",
                scrub: 0.6,
            },
            ease: "back.out(3)" 
        });

        // Animate nav links hiding into hamburger
        if (navLinks && menuBg) {
            const links = navLinks.querySelectorAll('a');
            const viewportHeight = window.innerHeight;
            
            // Set initial state for menu button
            gsap.set(menuBg, {
                scale: 0,
                opacity: 0,
            });
            
            // Create timeline for the two-step animation
            const hideTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: `${viewportHeight - 50}px top`,
                    end: `${viewportHeight + 100}px top`, 
                    scrub: 1,
                }
            });

            // Step 1: Slide left a bit (fake out)
            hideTimeline.to(links, {
                x: -10,
                opacity: 0.7,
                duration: 0.3,
                stagger: 0.05,
            });

            // Step 2a: Button appears and expands
            hideTimeline.to(menuBg, {
                scale: 1.25,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            }, "slideIn");

            // Step 2b: Slide links to same position
            hideTimeline.to(links, {
                x: (index) => {
                    const distances = [160, 110, 60];
                    return distances[index];
                },
                opacity: 0,
                duration: 1,
                stagger: {
                    each: 0.08,
                    from: "start"
                },
                ease: "power2.in"
            }, "slideIn");

            // Step 3: Shrink to final size
            hideTimeline.to(menuBg, {
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.3)" 
            }, "+=0.1");
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    });

    return { headerRef, companyNameRef, navLinksRef, menuBgRef, hoverMenuRef };
}