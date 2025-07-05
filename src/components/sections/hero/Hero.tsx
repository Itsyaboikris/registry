"use client";

import { useState, useEffect } from 'react';
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/images/couple/the_couple.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        {/* Subtle Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          // style={{
          //   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          // }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-in' : ''}`}>
          <h1 className={`text-7xl font-playfair mb-6 gold-text ${isVisible ? 'animate-slide-up delay-100' : ''}`}>
            Kristi & Joshua
          </h1>
          <p className={`text-4xl font-cormorant mb-4 text-white/90 ${isVisible ? 'animate-slide-up delay-200' : ''}`}>
            Are Getting Married
          </p>
          <p className={`text-2xl font-cormorant mb-12 text-white/80 ${isVisible ? 'animate-slide-up delay-300' : ''}`}>
            October 31, 2025 • St. Augustine, Trinidad and Tobago
          </p>
          <div className={`mb-12 ${isVisible ? 'animate-slide-up delay-400' : ''}`}>
            <Countdown targetDate="2025-10-31T00:00:00" />
          </div>
          <Link 
            href="/rsvp" 
            className={`inline-block px-8 py-4 border-2 border-primary text-primary font-cormorant text-xl uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 ${isVisible ? 'animate-slide-up delay-500' : ''}`}
          >
            RSVP Now
          </Link>
        </div>
      </div>
    </section>
  );
}; 