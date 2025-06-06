import { useEffect, useRef } from 'react';
import styles from './WeddingDetails.module.css';

interface DetailCard {
  title: string;
  description: string;
  icon: string;
}

interface WeddingDetailsProps {
  isLoaded: boolean;
}

const weddingDetails: DetailCard[] = [
  {
    title: 'Ceremony',
    description: 'Join us for our ceremony at the beautiful garden venue.',
    icon: '💒'
  },
  {
    title: 'Reception',
    description: 'Celebrate with us at the elegant reception hall.',
    icon: '🎉'
  },
  {
    title: 'Dinner',
    description: 'Enjoy a delicious dinner prepared by our renowned chef.',
    icon: '🍽️'
  }
];

export const WeddingDetails: React.FC<WeddingDetailsProps> = ({ isLoaded }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.detailsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Wedding Details</h2>
        <p className={styles.subtitle}>
          Join us for this special celebration of love and commitment
        </p>
        <div className={styles.detailsGrid}>
          {weddingDetails.map((detail, index) => (
            <div
              key={detail.title}
              className={styles.detailCard}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.icon}>{detail.icon}</div>
              <h3 className={styles.cardTitle}>{detail.title}</h3>
              <p className={styles.cardDescription}>{detail.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 