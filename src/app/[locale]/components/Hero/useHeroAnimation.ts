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

        const colorText = getColor('--color-black');
        
        // ✅ Full gradient
        const gradient = 'linear-gradient(90deg, #070664 0%, #0A1CFF 35%, #1474F8 70%, #32E27F 100%)';
        
        // Use SplitText to split into characters
        const split = new SplitText(title, { 
            type: "chars",
            charsClass: "hero-letter"
        });
        
        // ✅ Store the original text content for gradient calculation
        const fullText = title.textContent || '';
        
        // Add hover effect to each character
        split.chars.forEach((char, index) => {
            const element = char as HTMLElement;
            element.style.cursor = 'pointer';
            element.style.display = 'inline-block';
            
            // ✅ Step 1: Start with solid color
            element.style.color = colorText;
            
            element.addEventListener('mouseenter', () => {
                // ✅ Step 2: Add transparency on hover
                gsap.to(element, {
                    opacity: 0.6,
                    duration: 0.3,
                    ease: "sine.inOut"
                });
            });
            
            element.addEventListener('mouseleave', () => {
                // ✅ Step 3: Apply gradient positioned for this specific letter
                const position = (index / split.chars.length) * 100;
                
                element.style.background = gradient;
                element.style.backgroundClip = 'text';
                element.style.setProperty('-webkit-background-clip', 'text');
                element.style.setProperty('-webkit-text-fill-color', 'transparent');
                element.style.color = 'transparent';
                
                // ✅ Position the gradient so it appears continuous across all letters
                element.style.backgroundSize = `${split.chars.length * 100}% 100%`;
                element.style.backgroundPosition = `${position}% 0`;
                
                gsap.to(element, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "sine.inOut"
                });
            });
        });

        return () => {
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