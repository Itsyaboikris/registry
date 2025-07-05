"use client";

import { useState, useEffect } from 'react';

interface WeddingDetailsProps {
  isLoaded: boolean;
}

export const WeddingDetails: React.FC<WeddingDetailsProps> = ({ isLoaded }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(true);
    }
  }, [isLoaded]);

  return (
    <section className="py-20 bg-[#faf7f2]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-5xl font-playfair mb-4 gold-text">Wedding Details</h2>
            <p className="text-xl font-cormorant text-foreground/80">
              Join us for our special celebration
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Venue Information */}
            <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white p-8 rounded-lg shadow-lg border border-primary/10">
                <h3 className="text-3xl font-playfair mb-6 text-primary">Venue</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-playfair text-xl mb-2">Hilstein Manor</h4>
                    <a 
                      href="https://maps.app.goo.gl/k23xFss2xsn8Bboe6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-cormorant text-lg text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group"
                    >
                      <span>Corner Ragbir and, Mc Lean Street<br />
                      St. Augustine, Trinidad and Tobago</span>
                      <svg 
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <p className="text-sm text-foreground/60 mt-2">Click to open in Google Maps</p>
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl mb-2">Date & Time</h4>
                    <p className="font-cormorant text-lg text-foreground/80">
                      October 31, 2025<br />
                      Ceremony begins at 2:30 PM<br />
                      <span className="text-sm italic">Please arrive by 2:15 PM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dress Code */}
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white p-8 rounded-lg shadow-lg border border-primary/10">
                <h3 className="text-3xl font-playfair mb-6 text-primary">Dress Code</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-playfair text-xl mb-2">Attire</h4>
                    <p className="font-cormorant text-lg text-foreground/80">
                      Semi-formal<br />
                      <span className="text-sm italic">*Please no jeans/denim pants</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl mb-2">Important Note</h4>
                    <p className="font-cormorant text-lg text-foreground/80">
                      Please avoid wearing white, ivory, or cream colored attire.<br />
                      Let the bride have her day!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 