"use client";

import { useEffect, useState } from 'react';
import { Countdown } from '@/components/countdown';
import Link from 'next/link';

interface HeroProps {
  isLoaded: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(true);
    }
  }, [isLoaded]);

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="parallax-container">
        <div 
          className="parallax-layer parallax-layer-back"
          style={{
            backgroundImage: "url('https://source.unsplash.com/random/1920x1080/?wedding,romantic')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        />
      </div>
      <div className={`absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/40 z-10 ${isVisible ? 'animate-fade-in' : ''}`}>
        <h1 className={`text-7xl font-playfair mb-4 gold-text ${isVisible ? 'animate-slide-up delay-100' : ''}`}>
          Kristoff & Riley
        </h1>
        <p className={`text-4xl font-cormorant mb-2 text-primary ${isVisible ? 'animate-slide-up delay-200' : ''}`}>
          Are getting married
        </p>
        <p className={`text-2xl font-cormorant mb-8 text-white/90 ${isVisible ? 'animate-slide-up delay-300' : ''}`}>
          December 31, 2025
        </p>
        <div className={`${isVisible ? 'animate-slide-up delay-400' : ''}`}>
          <Countdown targetDate="2025-12-31" />
        </div>
        <Link 
          href="/rsvp" 
          className={`mt-12 px-8 py-4 border-2 border-primary text-primary font-cormorant text-xl uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 ${isVisible ? 'animate-slide-up delay-500' : ''}`}
        >
          RSVP Now
        </Link>
      </div>
    </section>
  );
}; 