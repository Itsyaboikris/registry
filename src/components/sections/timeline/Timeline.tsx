import { useRef, useEffect } from 'react';
import styles from './Timeline.module.css';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  position: 'left' | 'right';
}

interface TimelineProps {
  isLoaded: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    time: '3:30 PM',
    title: 'Guest Arrival',
    description: 'Guests arrive at St. Mary\'s Cathedral for the ceremony',
    position: 'left'
  },
  {
    time: '4:00 PM',
    title: 'Ceremony',
    description: 'Wedding ceremony at St. Mary\'s Cathedral',
    position: 'right'
  },
  {
    time: '5:30 PM',
    title: 'Cocktail Hour',
    description: 'Cocktails and hors d\'oeuvres at Golden Gate Club',
    position: 'left'
  },
  {
    time: '6:30 PM',
    title: 'Dinner Reception',
    description: 'Dinner, toasts, and celebration at Golden Gate Club',
    position: 'right'
  },
  {
    time: '9:00 PM',
    title: 'Dancing',
    description: 'Dance the night away with live music and celebration',
    position: 'left'
  }
];

export const Timeline = ({ isLoaded }: TimelineProps) => {
  const timelineSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (timelineSectionRef.current) {
      observer.observe(timelineSectionRef.current);
    }

    return () => {
      if (timelineSectionRef.current) {
        observer.unobserve(timelineSectionRef.current);
      }
    };
  }, []);

  return (
    <section id="program" ref={timelineSectionRef} className={styles.timelineSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Wedding Day Timeline</h2>
        <p className={styles.subtitle}>
          Join us for a day filled with love, joy, and celebration
        </p>
        
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`${styles.timelineEvent} ${styles[`timelineEvent${event.position}`]}`}
            >
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <h3 className={styles.eventTitle}>
                  {event.time} - {event.title}
                </h3>
                <p className={styles.eventDescription}>
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 