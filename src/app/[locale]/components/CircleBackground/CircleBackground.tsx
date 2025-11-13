"use client";

import { useRef, useEffect } from 'react';
import styles from './CircleBackground.module.css';

export default function CircleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const getColor = (variable: string) => {
            return getComputedStyle(document.documentElement)
                .getPropertyValue(variable)
                .trim();
        };
        const colorPrimary = getColor('--color-primary');

        // Set canvas size and draw
        const drawCircles = () => {
            const wrapper = canvas.parentElement;
            if (wrapper) {
                canvas.width = wrapper.clientWidth;
                canvas.height = wrapper.clientHeight;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            // Clear and draw once
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Circle grid configuration
            const circleRadius = 15;
            const spacing = 300;

            // Calculate grid dimensions
            const cols = Math.ceil(canvas.width / spacing) + 1;
            const rows = Math.ceil(canvas.height / spacing) + 1;

            // Define tunnel layers (back to front)
            const layers = [
                { offset: 0.03, opacity: '10', radius: 0.5, glow: 15 },   // Furthest back
                { offset: 0.02, opacity: '18', radius: 0.7, glow: 12 },  // Middle-back
                { offset: 0.01, opacity: '25', radius: 0.85, glow: 10 },  // Middle-front
                { offset: 0, opacity: '40', radius: 1, glow: 8 }         // Front (original)
            ];

            // Draw static grid
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = 50 + col * spacing;
                    const y = 50 + row * spacing;

                    // Draw each layer with tunnel offset and glow
                    layers.forEach(layer => {
                        // Calculate offset toward center (tunnel effect)
                        const offsetX = (centerX - x) * layer.offset;
                        const offsetY = (centerY - y) * layer.offset;
                        
                        const layerX = x + offsetX;
                        const layerY = y + offsetY;
                        const layerRadius = circleRadius * layer.radius;

                        // Add glow effect
                        ctx.shadowBlur = layer.glow;
                        ctx.shadowColor = `${colorPrimary}${layer.opacity}`;

                        // Draw circle
                        ctx.beginPath();
                        ctx.arc(layerX, layerY, layerRadius, 0, Math.PI * 2);
                        ctx.strokeStyle = `${colorPrimary}${layer.opacity}`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    });

                    // Reset shadow for next circle
                    ctx.shadowBlur = 0;
                }
            }
        };

        // Draw once on mount
        drawCircles();

        // Redraw only on resize
        window.addEventListener('resize', drawCircles);

        // Cleanup
        return () => {
            window.removeEventListener('resize', drawCircles);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.canvas} />;
}