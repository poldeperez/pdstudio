import { useRef } from "react";
import { useHeroAnimation } from "./useHeroAnimation";
import { useHeroBackground } from "./useHeroBackground";
import styles from "./Hero.module.css"

export default function Hero() {
    const { titleRef } = useHeroAnimation();
    const { canvasRef } = useHeroBackground();
    return (
        <section className={`hero ${styles.hero}`}>
            <canvas 
                ref={canvasRef} 
                className={styles.backgroundCanvas}
            />
            <div className={styles.title}>
                <h1 ref={titleRef}>
                    DEP studio
                </h1>
            </div>
        </section>
    );
}