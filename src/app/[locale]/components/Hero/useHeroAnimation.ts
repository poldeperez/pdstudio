import { useRef, useEffect } from 'react';
import { gsap, useGSAP, SplitText } from "@/utils/gsap";

export function useHeroAnimation() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    
    // Letter hover effect with SplitText
    useGSAP(() => {
        const title = titleRef.current;
        
        if (!title) return;

        const getColor = (variable: string) => {
            return getComputedStyle(document.documentElement)
                .getPropertyValue(variable)
                .trim();
        };

        const colorPrimary = getColor('--color-primary');
        
        // Use SplitText to split into characters
        const split = new SplitText(title, { 
            type: "chars",
            charsClass: "hero-letter"
        });
        
        // Add hover effect to each character
        split.chars.forEach((char) => {
            (char as HTMLElement).style.cursor = 'pointer';
            
            char.addEventListener('mouseenter', () => {
                gsap.to(char, {
                    color: 'transparent',
                    webkitTextStroke: `1px ${colorPrimary}`, 
                    duration: 0.3,
                    ease: "sine.inOut"
                });
            });
            
            char.addEventListener('mouseleave', () => {
                gsap.to(char, {
                    color: colorPrimary, 
                    webkitTextStroke: '0px',
                    duration: 0.3,
                    ease: "sine.inOut"
                });
            });
        });

        return () => {
            // Cleanup - reverts DOM to original state
            split.revert();
        };
    }, { scope: titleRef });

    // 3D cursor follow effect
    useEffect(() => {
        if (!titleRef.current) return;
        
        const title = titleRef.current;
        
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            gsap.to(title, {
                rotationY: x * 7,
                rotationX: -y * 7,
                duration: 0.5,
                ease: "power2.out"
            });
        };
        
        const handleMouseLeave = () => {
            gsap.to(title, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return { titleRef };
}