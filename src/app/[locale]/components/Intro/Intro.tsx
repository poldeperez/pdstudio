import { useIntroAnimation } from "./useIntroAnimation";
import styles from "./Intro.module.css";

export default function Intro() {
    const containerRef = useIntroAnimation();

    return (
        <section 
            className={`intro ${styles.main}`} // ✅ 'intro' class for ScrollTrigger
            ref={containerRef}
        >
            <div className={styles.title}>
                <h1>
                    We are a creative studio specializing in branding, web design, and digital experiences.
                </h1>
            </div>
        </section>
    );
}