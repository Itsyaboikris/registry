"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Sample gallery photos - replace with your actual photos
const galleryPhotos: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552",
    alt: "Couple at sunset",
    width: 1200,
    height: 800
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    alt: "Engagement photo",
    width: 800,
    height: 1200
  },
  {
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485",
    alt: "Romantic dinner",
    width: 1200,
    height: 800
  },
  {
    src: "https://images.unsplash.com/photo-1439539698758-ba2680ecadb9",
    alt: "First date",
    width: 800,
    height: 1000
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf",
    alt: "Wedding planning",
    width: 1200,
    height: 900
  },
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b3ce551",
    alt: "Proposal moment",
    width: 900,
    height: 1200
  }
];

interface GalleryProps {
  isLoaded: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ isLoaded }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    resetOnExit: false
  });

  // Close lightbox with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPhoto) {
        setSelectedPhoto(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-playfair text-center mb-4 gold-text transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our Gallery
          </h2>
          <p className={`text-xl font-cormorant text-center mb-12 text-foreground/80 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            A collection of our favorite moments together
          </p>
          
          {/* Masonry Gallery */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {galleryPhotos.map((photo, index) => (
              <div 
                key={index} 
                className={`cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  photo.height > photo.width ? 'row-span-2' : ''
                }`}
                onClick={() => setSelectedPhoto(photo)}
                style={{
                  transitionDelay: `${200 + index * 100}ms`
                }}
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Lightbox */}
          {selectedPhoto && (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <div className="relative max-w-6xl max-h-[90vh] w-full">
                <div className="relative h-full w-full">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
                <button 
                  className="absolute top-4 right-4 text-white text-3xl font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(null);
                  }}
                >
                  &times;
                </button>
                <p className="text-white text-center mt-4">{selectedPhoto.alt}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 