import { Link } from '@/i18n/navigation';
import styles from "./Services.module.css";
import { useTranslations } from 'next-intl';

export interface CardProps {
  title: string;
  description: string;
  qualities: string[];
  extraInfo: string;
  index: number;
}

export function Card({ title, description, qualities, index }: CardProps) {
  const t = useTranslations('services');
  return (
    <div className={`card ${styles.card} ${styles[`card${index + 1}`]}`} id={`card-${index + 1}`}>
      <div className={`card-inner ${styles.cardInner}`}>
        <div className={`cardContent ${styles.cardContent}`}>
          <h1>{title}</h1>
          <div className={styles.cardColumns}>
            <p>{description}</p>
            <ul className={styles.cardQualities}>
              {qualities.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`cardImg ${styles.cardImg}`}>
          <img src={`/assets/card-${index + 1}.jpg`} alt={title} />
        </div>
      </div>
      {index === 3 && (
        <div className={styles.serviceButton}>
          <Link href="/services" onClick={() => window.scrollTo(0, 0)}>
            {t("serviceButton")}
          </Link>
        </div>
      )}
    </div>
  );
}