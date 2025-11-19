import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from "@/utils/gsap";
import { usePathname } from '@/i18n/navigation';

export function useHeaderAnimation() {
    const headerRef = useRef<HTMLDivElement>(null);
    const companyNameRef = useRef<HTMLAnchorElement>(null);
    const menuBgRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();
    
    useGSAP(() => {
        const companyName = companyNameRef.current;
        const menuBg = menuBgRef.current;
        
        if (!companyName) return;

        const isHomePage = pathname === '/' || pathname === '';

        if (isHomePage) {
            // ✅ Home page: Scroll-triggered animation
            gsap.set(companyName, {
                y: -20,
                rotationX: -90,
                opacity: 0,
                scale: 0.9,
                visibility: 'visible',
                transformPerspective: 1000,
            });
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
        } else {
            // ✅ Other pages: Simple fade-in on load
            gsap.fromTo(companyName, 
                {
                    y: -10,
                    opacity: 0,
                    visibility: 'visible',
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.3
                }
            );
        }

        // Animate nav links into hamburger
        if (menuBg) {
            const lines = menuBg.querySelectorAll('.line');
            
            // ✅ Entrance animation timeline
            const t = gsap.timeline();
            
            t.fromTo(menuBg, 
                {
                    scale: 0,
                    opacity: 0,
                },
                {
                    scale: 1.1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.5,
                }
            )
            .to(menuBg, {
                scale: 1,
                duration: 0.2,
                ease: "back.out(1.3)"
            })
            .fromTo(lines,
                {
                    scaleX: 0,
                    x: (index) => index === 0 ? -20 : 20,
                    transformOrigin: "center center",
                    opacity: 0
                },
                {
                    scaleX: 1,
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(2)",
                    stagger: 0.1
                }
            );

            // ✅ Hover animations with animation killing
            menuBg.addEventListener('mouseenter', () => {
                gsap.killTweensOf(menuBg);
                gsap.killTweensOf(lines);
                
                gsap.to(menuBg, {
                    width: 420,
                    paddingLeft: 24,
                    paddingRight: 24,
                    duration: 0.4,
                    ease: "power2.out"
                });

                gsap.to(lines, {
                    opacity: 0,
                    scaleX: 0,
                    duration: 0.1,
                    ease: "power2.in"
                });
            });

            menuBg.addEventListener('mouseleave', () => {
                gsap.killTweensOf(menuBg);
                gsap.killTweensOf(lines);
                
                gsap.to(menuBg, {
                    width: 45,
                    paddingLeft: 0,
                    paddingRight: 0,
                    duration: 0.4,
                    ease: "power2.in"
                });

                gsap.to(lines, {
                    opacity: 1,
                    scaleX: 1,
                    duration: 0.4,
                    ease: "back.out(1.5)",
                    stagger: 0.06,
                    delay: 0.5
                });
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [pathname]); // ✅ Add pathname as dependency

    return { headerRef, companyNameRef, menuBgRef };
}