import { useProductsAnimations } from './useProductsAnimations';
import styles from './Products.module.css';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Products() {
    const t = useTranslations("works");
    const containerRef = useProductsAnimations();

    const generateRows = () => {
        const rows = [];
        for (let i = 1; i <= 3; i++) {
        rows.push(
            <div className={`row ${styles.row}`} key={i}>
                <div className={`card-left ${styles.card}`}>
                    <img src={`/assets/product-${2 * i - 1}.jpg`} alt={`Product ${2 * i - 1}`} />
                </div>
                <div className={`card-right ${styles.card}`}>
                    <img src={`/assets/product-${2 * i}.jpg`} alt={`Product ${2 * i}`} />
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
                    <img src="/logo.svg" alt="Logo" />
                </div>
                <div className={styles.copy}>
                    <div className={`line ${styles.line}`}>
                        <p>{t("home1")}</p>
                    </div>
                    <div className={`line ${styles.line}`}>
                        <p>{t("home2")}</p>
                    </div>
                    <div className={`line ${styles.line}`}>
                        <p>{t("home3")}</p>
                    </div>
                </div>
                <Link href="/works" className="button-link-secondary" onClick={() => window.scrollTo(0, 0)}>
                    {t("works")}
                </Link>
            </div>
            <div className={styles.rowsWrapper}>
                {generateRows()}
            </div>
        </section>
    );
}