import { useRef } from 'react';

export function useIntroAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // ✅ Remove the ScrollTrigger pin - not needed anymore
    // The 3D model handles the animation between sections
    
    return containerRef;
}