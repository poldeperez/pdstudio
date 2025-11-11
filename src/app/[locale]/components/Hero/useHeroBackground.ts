import { useRef, useEffect } from 'react';

export function useHeroBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse position
        let mouseX = -1000; // Start off-screen
        let mouseY = -1000;

        // Track mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Circle grid configuration
        const circleRadius = 15;
        const spacing = 300; // Distance between circle centers
        const mouseInfluence = 150; // How far the cursor affects

        // Calculate grid dimensions
        const cols = Math.ceil(canvas.width / spacing) + 1;
        const rows = Math.ceil(canvas.height / spacing) + 1;

        // Animation loop
        let animationFrame: number;

        const animate = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid of circles
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    // Base position
                    const baseX = 50 + col * spacing;
                    const baseY = 50 + row * spacing;
                    
                    let x = baseX;
                    let y = baseY;

                    // Cursor influence
                    const distanceX = x - mouseX;
                    const distanceY = y - mouseY;
                    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                    if (distance < mouseInfluence) {
                        const influence = (mouseInfluence - distance) / mouseInfluence;
                        // Push away from cursor
                        x += distanceX * influence * 0.3;
                        y += distanceY * influence * 0.3;
                    }

                    // Draw circle (stroke only, no fill)
                    ctx.beginPath();
                    ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'; // ✅ Stroke instead of fill
                    ctx.lineWidth = 1; // ✅ Stroke width
                    ctx.stroke(); // ✅ Draw stroke instead of fill
                }
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return { canvasRef };
}