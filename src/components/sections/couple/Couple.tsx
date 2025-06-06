"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CoupleProps {
  isLoaded: boolean;
}

export const Couple: React.FC<CoupleProps> = ({ isLoaded }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(true);
    }
  }, [isLoaded]);

  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className={`text-5xl font-playfair text-center mb-16 gold-text ${isVisible ? 'animate-slide-up delay-100' : ''}`}>
            The Happy Couple
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* First Photo */}
            <div className={`relative aspect-[3/4] overflow-hidden rounded-lg shadow-xl ${isVisible ? 'animate-slide-up delay-200' : ''}`}>
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552"
                alt="Bride"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-3xl font-playfair mb-2">Sarah</h3>
                <p className="font-cormorant text-lg">The Bride</p>
              </div>
            </div>

            {/* Second Photo */}
            <div className={`relative aspect-[3/4] overflow-hidden rounded-lg shadow-xl ${isVisible ? 'animate-slide-up delay-300' : ''}`}>
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552"
                alt="Groom"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-3xl font-playfair mb-2">Michael</h3>
                <p className="font-cormorant text-lg">The Groom</p>
              </div>
            </div>
          </div>

          {/* Couple Story */}
          <div className={`mt-16 text-center max-w-3xl mx-auto ${isVisible ? 'animate-slide-up delay-400' : ''}`}>
            <p className="text-xl font-cormorant text-foreground/80 leading-relaxed">
              Our love story began on a beautiful summer evening in 2020. 
              What started as a chance encounter blossomed into a beautiful journey of love, 
              laughter, and countless memories. We're excited to begin this new chapter of our lives together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 