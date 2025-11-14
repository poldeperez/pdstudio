import { useServicesAnimation } from './useServicesAnimations';
import styles from './Services.module.css';

interface CardProps {
  title: string;
  description: string;
  index: number;
}

const Card = ({ title, description, index }: CardProps) => {
  return (
    <div className={`card ${styles.card} ${styles[`card${index + 1}`]}`} id={`card-${index + 1}`}>
      <div className={`card-inner ${styles.cardInner}`}>
        <div className={styles.cardContent}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className={styles.cardImg}>
          <img src={`/assets/card-${index + 1}.jpg`} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default function Services() {
  const containerRef = useServicesAnimation();

  const cards = [
    {
      title: "Brand Strategy",
      description:
        "Crafting unique brand identities that resonate with your target audience and set you apart from the competition.",
    },
    {
      title: "Web Design",
      description:
        "Designing visually stunning and user-friendly websites that provide an exceptional user experience across all devices."
    },
    {
      title: "Digital Marketing",
      description:
        "Implementing effective digital marketing strategies to boost your online presence and drive traffic to your website."
    },
    {
      title: "SEO Optimization",
      description:
        "Implementing effective SEO strategies to improve your website's visibility and ranking on search engines."
    }
  ];
    return (
      <section className={`services-section ${styles.servicesSection}`} ref={containerRef}>
      <div className={`services-intro ${styles.servicesIntro}`}>
        <h2>What WE Do</h2>
      </div>

        {cards.map((card, index) => (
          <Card key={index} {...card} index={index} />
        ))}

      <div className={`services-outro ${styles.servicesOutro}`}>
        
      </div>
    </section>
  );
}