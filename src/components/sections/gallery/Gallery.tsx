"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Gallery photos - using your actual photos
const galleryPhotos: Photo[] = [
  {
    src: "/images/gallery/gallery_1.jpeg",
    alt: "Kristi & Joshua - Beautiful moments together",
    width: 1200,
    height: 800
  },
  {
    src: "/images/gallery/gallery_2.jpeg",
    alt: "Kristi & Joshua - Special memories",
    width: 800,
    height: 1200
  },
  {
    src: "/images/gallery/gallery_3.jpeg",
    alt: "Kristi & Joshua - Love and laughter",
    width: 1200,
    height: 800
  },
  {
    src: "/images/gallery/gallery_4.jpeg",
    alt: "Kristi & Joshua - Precious moments",
    width: 800,
    height: 1000
  },
  {
    src: "/images/gallery/gallery_5.jpeg",
    alt: "Kristi & Joshua - Together forever",
    width: 1200,
    height: 900
  },
  {
    src: "/images/gallery/gallery_6_proposal_1.png",
    alt: "The Proposal - A magical moment",
    width: 900,
    height: 1200
  },
  {
    src: "/images/gallery/gallery_7_proposal_2.jpeg",
    alt: "The Proposal - Forever begins",
    width: 1200,
    height: 800
  }
];

interface GalleryProps {
  isLoaded: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ isLoaded }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(true);
    }
  }, [isLoaded]);

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-5xl font-playfair mb-4 gold-text">Photo Gallery</h2>
            <p className="text-xl font-cormorant text-foreground/80">
              Our journey together in pictures
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {galleryPhotos.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg cursor-pointer group transform transition-all duration-300 hover:scale-105"
                onClick={() => openModal(photo)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                    <p className="font-cormorant text-sm">Click to enlarge</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ×
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}; 