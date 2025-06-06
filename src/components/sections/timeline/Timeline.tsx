"use client";

import { useState, useEffect } from 'react';
import styles from './Timeline.module.css';

interface TimelineEvent {
  date: string;
  title: string;
  location: string;
  description: string;
}

interface TimelineProps {
  isLoaded: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "June 10, 2025 - 4:00 PM",
    title: "Welcome Reception",
    location: "Garden Patio",
    description: "Join us for drinks and appetizers as we welcome our guests."
  },
  {
    date: "June 11, 2025 - 2:00 PM",
    title: "Ceremony",
    location: "Rose Garden",
    description: "Witness our vows as we officially tie the knot."
  },
  {
    date: "June 11, 2025 - 5:00 PM",
    title: "Dinner & Dancing",
    location: "Grand Ballroom",
    description: "Celebrate with us with a formal dinner followed by dancing."
  },
  {
    date: "June 12, 2025 - 10:00 AM",
    title: "Farewell Brunch",
    location: "Terrace Restaurant",
    description: "A casual brunch to say goodbye before we depart for our honeymoon."
  }
];

export const Timeline: React.FC<TimelineProps> = ({ isLoaded }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(true);
      
      // Set up the Intersection Observer to animate timeline items as they scroll into view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Use type assertion to tell TypeScript that target is an HTMLElement
              const element = entry.target as HTMLElement;
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            }
          });
        },
        { threshold: 0.2 }
      );
      
      // Observe all timeline items
      document.querySelectorAll('.timeline-item').forEach((item) => {
        observer.observe(item);
      });
      
      return () => {
        observer.disconnect();
      };
    }
  }, [isLoaded]);

  return (
    <section className="py-20 bg-[#faf7f2]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-5xl font-playfair text-center mb-4 gold-text transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Wedding Timeline
          </h2>
          <p className={`text-xl font-cormorant text-center mb-12 text-foreground/80 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Our special day schedule of events
          </p>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/30"></div>
            
            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`timeline-item relative flex items-center mb-16 last:mb-0 transition-all duration-700 opacity-0 transform translate-y-10`}
                style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white"></div>
                
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-primary/10">
                    <span className="inline-block mb-2 text-sm text-primary/80 font-semibold">{event.date}</span>
                    <h3 className="text-2xl font-playfair mb-1">{event.title}</h3>
                    <p className="text-sm text-foreground/70 mb-3">{event.location}</p>
                    <p className="font-cormorant text-foreground/90">{event.description}</p>
                  </div>
                </div>
                
                {/* Empty space for the other side */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 