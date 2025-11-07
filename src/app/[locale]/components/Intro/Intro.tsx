import { useIntroAnimation } from './useIntroAnimation';
import styles from "./Intro.module.css"

export default function Intro() {
    const containerRef = useIntroAnimation();
    return (
        <section className={styles.main} ref={containerRef}>
            <div className={styles.title}>
                <h1>
                    Creating standout brands and digital experiences that captivate audiences and drive meaningful connections.
                </h1>
            </div>
          
        </section>
    );
}