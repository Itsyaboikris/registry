"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RSVPProps {
  isLoaded: boolean;
}

// RSVP deadline: September 20, 2025 at midnight UTC
const RSVP_DEADLINE = new Date('2025-09-21T00:00:00Z'); // September 21st at midnight UTC = September 20th end

export const RSVP: React.FC<RSVPProps> = ({ isLoaded }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    const now = new Date();
    const isPassed = now >= RSVP_DEADLINE;
    console.log('Homepage RSVP Deadline Check:', {
      currentTime: now.toISOString(),
      deadline: RSVP_DEADLINE.toISOString(),
      isPassed: isPassed
    });
    setIsDeadlinePassed(isPassed);
  }, []);

  return (
    <section className="relative py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-center ${isVisible ? 'animate-fade-in' : ''}`}>
          {isDeadlinePassed ? (
            <>
              <h2 className={`text-5xl font-playfair mb-6 gold-text ${isVisible ? 'animate-slide-up delay-100' : ''}`}>
                RSVP Deadline Passed
              </h2>
              <p className={`text-xl font-cormorant mb-12 text-foreground/80 ${isVisible ? 'animate-slide-up delay-200' : ''}`}>
                We're sorry, but our RSVP deadline has passed. We would have loved to have you attend, but final numbers have now been turned in.
              </p>
              <div className={`flex flex-col sm:flex-row gap-6 justify-center ${isVisible ? 'animate-slide-up delay-300' : ''}`}>
                <Link 
                  href="/registry" 
                  className="px-8 py-4 border-2 border-foreground/20 text-foreground font-cormorant text-xl uppercase tracking-wider hover:bg-foreground hover:text-white transition-all duration-300"
                >
                  View Registry
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className={`text-5xl font-playfair mb-6 gold-text ${isVisible ? 'animate-slide-up delay-100' : ''}`}>
                Join Us on Our Special Day
              </h2>
              <p className={`text-xl font-cormorant mb-12 text-foreground/80 ${isVisible ? 'animate-slide-up delay-200' : ''}`}>
                We would be honored to have you celebrate this momentous occasion with us.
                Please respond by September 20th, 2025.
              </p>
              <div className={`flex flex-col sm:flex-row gap-6 justify-center ${isVisible ? 'animate-slide-up delay-300' : ''}`}>
                <Link 
                  href="/rsvp" 
                  className="px-8 py-4 border-2 border-primary text-primary font-cormorant text-xl uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300"
                >
                  RSVP Now
                </Link>
                <Link 
                  href="/registry" 
                  className="px-8 py-4 border-2 border-foreground/20 text-foreground font-cormorant text-xl uppercase tracking-wider hover:bg-foreground hover:text-white transition-all duration-300"
                >
                  View Registry
                </Link>
              </div>
            </>
          )}
          <p className={`mt-12 text-lg font-cormorant text-foreground/60 ${isVisible ? 'animate-slide-up delay-400' : ''}`}>
            For any questions, please contact us at{' '}
            <a href="mailto:wedding@example.com" className="text-primary hover:underline">
              wedding@example.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}; 