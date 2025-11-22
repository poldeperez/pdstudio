import { useServicesAnimation } from './useServicesAnimations';
import { Link } from '@/i18n/navigation';
import styles from './Services.module.css';

interface CardProps {
  title: string;
  description: string;
  qualities: string[];
  index: number;
}

const Card = ({ title, description, qualities, index }: CardProps) => {
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
          <Link href="/services">
            Want to know more?
          </Link>
        </div>
      )}
    </div>
  );
};

export default function Services() {
  const containerRef = useServicesAnimation();

  const cards = [
    {
      title: "Web Design",
      description:
        "Designing visually stunning and user-friendly websites that provide an exceptional user experience across all devices.",
      qualities: [
        "Responsive layouts",
        "UI/UX best practices",
        "Accessibility",
        "Performance"
      ]
    },
    {
      title: "SEO Optimization",
      description:
        "Implementing effective SEO strategies to improve your website's visibility and ranking on search engines.",
      qualities: [
        "Positioning",
        "Keyword research",
        "On-page SEO",
        "Link building",
        "Technical audits"
      ]
    },
    {
      title: "Product",
      description:
        "Crafting unique brand identities that resonate with your target audience and set you apart from the competition.",
      qualities: [
        "UX Design",
        "User Testing",
        "Product Prototype",
        "Mobile UI",
        "Sotware UI design",
        "Web app design",
        "Interaction design"
      ]
    },
    {
      title: "Digital Marketing",
      description:
        "Implementing effective digital marketing strategies to boost your online presence and drive traffic to your website.",
      qualities: [
        "Social media",
        "Email campaigns",
        "Content strategy",
        "Analytics",
        "Market research"
      ]
    }
  ];
    return (
      <section className={`services-section ${styles.servicesSection}`} ref={containerRef}>
      <div className={`services-intro ${styles.servicesIntro}`}>
        <h2>What we do</h2>
      </div>

        {cards.map((card, index) => (
          <Card key={index} {...card} index={index} />
        ))}

      <div className={`services-outro ${styles.servicesOutro}`}></div>
    </section>
  );
}