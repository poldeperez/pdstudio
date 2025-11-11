import { useRef } from 'react';
import { gsap, useGSAP } from "@/utils/gsap";

export function useHeroAnimation() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    
    useGSAP(() => {
        const title = titleRef.current;
        
        if (!title) return;

        // Split the text into individual letters
        const text = title.textContent || '';
        title.innerHTML = ''; // Clear original text
        
        // Create span for each letter
        text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
            span.style.display = 'inline-block';
            span.style.cursor = 'pointer';
            
            // Add hover effect
            span.addEventListener('mouseenter', () => {
                gsap.to(span, {
                    color: 'transparent',
                    webkitTextStroke: '1px #000', 
                    duration: 0.3,
                    ease: "sine.inOut"
                });
            });
            
            span.addEventListener('mouseleave', () => {
                gsap.to(span, {
                    color: '#000', 
                    webkitTextStroke: '0px',
                    duration: 0.3,
                    ease: "sine.inOut"
                });
            });
            
            title.appendChild(span);
        });

        return () => {
            // Cleanup on unmount
            if (title) {
                const spans = title.querySelectorAll('span');
                spans.forEach(span => {
                    span.removeEventListener('mouseenter', () => {});
                    span.removeEventListener('mouseleave', () => {});
                });
            }
        };
    }, { scope: titleRef });

    return { titleRef };
}