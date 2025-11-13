import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { SplitText } from "gsap/SplitText";

// Register plugins once
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Export for use elsewhere
export { gsap, ScrollTrigger, SplitText, useGSAP };