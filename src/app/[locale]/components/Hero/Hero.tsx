import { useRef } from "react";
import { useHeroAnimation } from "./useHeroAnimation";
import Hero3D from "./Hero3D";
import styles from "./Hero.module.css"

export default function Hero() {
    const { titleRef } = useHeroAnimation();
    return (
        <section className={`hero ${styles.hero}`}>
            <Hero3D />
            <div className={styles.title}>
                <h1 ref={titleRef}>
                    dz node
                </h1>
            </div>
        </section>
    );
}