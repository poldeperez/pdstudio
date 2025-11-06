import { useProductsAnimations } from './useProductsAnimations';
import styles from './Products.module.css';
import Link from "next/link";

export default function Products() {
    
    const containerRef = useProductsAnimations();

    const generateRows = () => {
        const rows = [];
        for (let i = 1; i <= 3; i++) {
        rows.push(
            <div className={`row ${styles.row}`} key={i}>
                <div className={`card-left ${styles.card}`}>
                    <img src={`/assets/card-${2 * i - 1}.jpg`} alt={`Card ${2 * i - 1}`} />
                </div>
                <div className={`card-right ${styles.card}`}>
                    <img src={`/assets/card-${2 * i}.jpg`} alt={`Card ${2 * i}`} />
                </div>
            </div>
        )
        }
        return rows;
    };
    return (
        <section className={`main ${styles.main}`} ref={containerRef}>
            <div className={`mainContent ${styles.mainContent}`}>
                <div className={`logo ${styles.logo}`}>
                    <img src="/assets/card-1.jpg" alt="Logo" />
                </div>
                <div className={styles.copy}>
                    <div className={`line ${styles.line}`}>
                        <p>Delve into coding without clutter</p>
                    </div>
                    <div className={`line ${styles.line}`}>
                        <p>Delve into coding without clutter</p>
                    </div>
                    <div className={`line ${styles.line}`}>
                        <p>Delve into coding without clutter</p>
                    </div>
                </div>
                <div className="btn">
                    <button className={`button ${styles.button}`}>Get PRO</button>
                </div>
            </div>
            {generateRows()}
            <section className={styles.footer}>
                <Link href="/">Join our revolution</Link>
            </section>
        </section>
    );
}