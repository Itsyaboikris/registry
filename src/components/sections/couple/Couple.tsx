"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CoupleProps {
  isLoaded: boolean;
}

export const Couple: React.FC<CoupleProps> = ({ isLoaded }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { elementRef: mainPhotoRef, isVisible: isMainPhotoVisible } = useScrollAnimation({ 
    threshold: 0.1,
    resetOnExit: true 
  });
  const { elementRef: titleRef, isVisible: isTitleVisible } = useScrollAnimation({ 
    threshold: 0.2,
    resetOnExit: true 
  });
  const { elementRef: photosRef, isVisible: isPhotosVisible } = useScrollAnimation({ 
    threshold: 0.1,
    resetOnExit: true 
  });
  const { elementRef: storyRef, isVisible: isStoryVisible } = useScrollAnimation({ 
    threshold: 0.2,
    resetOnExit: true 
  });

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(true);
    }
  }, [isLoaded]);

  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto ${isVisible ? 'animate-fade-in' : ''}`}>
          {/* Main Couple Photo */}
          <div 
            ref={mainPhotoRef}
            className={`relative w-full aspect-[16/9] mb-20 overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-1000 ${isMainPhotoVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
          >
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552"
              alt="Kristi & Joshua"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
              <h1 className="text-6xl font-playfair mb-4 gold-text">Kristi & Joshua</h1>
              <p className="text-2xl font-cormorant">Together Forever</p>
            </div>
          </div>

          <div ref={titleRef} className={`transform transition-all duration-1000 ${isTitleVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl font-playfair text-center mb-16 gold-text">
              The Happy Couple
            </h2>
          </div>
          
          <div 
            ref={photosRef} 
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transform transition-all duration-1000 ${isPhotosVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
          >
            {/* First Photo */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-xl group">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552"
                alt="Bride"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 group-hover:translate-y-2">
                <h3 className="text-3xl font-playfair mb-2">Kristi</h3>
                <p className="font-cormorant text-lg">The Bride</p>
              </div>
            </div>

            {/* Second Photo */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-xl group">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552"
                alt="Groom"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 group-hover:translate-y-2">
                <h3 className="text-3xl font-playfair mb-2">Joshua</h3>
                <p className="font-cormorant text-lg">The Groom</p>
              </div>
            </div>
          </div>

          {/* Couple Story */}
          <div 
            ref={storyRef} 
            className={`mt-16 text-center max-w-3xl mx-auto transform transition-all duration-1000 ${isStoryVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
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