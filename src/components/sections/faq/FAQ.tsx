"use client";

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'venue' | 'registry' | 'travel';
}

const faqItems: FAQItem[] = [
  {
    question: "What's the dress code?",
    answer: "The dress code is formal attire. Men are encouraged to wear suits or tuxedos, and women floor-length or cocktail dresses. The ceremony will be held outdoors, so please choose appropriate footwear.",
    category: 'general'
  },
  {
    question: "Can I bring a plus one?",
    answer: "We've allocated plus ones based on our budget and venue capacity. Your invitation will specify if you have a plus one. If you have any questions, please contact us directly.",
    category: 'general'
  },
  {
    question: "Are children welcome?",
    answer: "While we love your little ones, our wedding will be an adults-only celebration. We hope this advance notice allows you to make appropriate arrangements.",
    category: 'general'
  },
  {
    question: "Where is the venue located?",
    answer: "The ceremony and reception will be held at Grand Ballroom, 123 Wedding Lane, New York, NY. The venue is approximately 30 minutes from downtown and has ample parking.",
    category: 'venue'
  },
  {
    question: "Is there parking available at the venue?",
    answer: "Yes, there is complimentary valet parking available for all guests. If you prefer to self-park, there's a garage adjacent to the venue that charges $10 for the evening.",
    category: 'venue'
  },
  {
    question: "Are there accommodations nearby?",
    answer: "We've reserved room blocks at two nearby hotels: The Grand Hotel and Luxury Suites. Please use code 'WEDDING2025' when booking to receive our special rate.",
    category: 'travel'
  },
  {
    question: "Where are you registered?",
    answer: "We're registered at Crate & Barrel, Amazon, and Zola. Links to our registry pages are available on the Registry page of our website.",
    category: 'registry'
  },
  {
    question: "What time should I arrive?",
    answer: "Doors open at 3:30 PM, and we kindly ask all guests to be seated by 3:45 PM. The ceremony will begin promptly at 4:00 PM.",
    category: 'general'
  }
];

interface FAQProps {
  isLoaded: boolean;
}

export const FAQ: React.FC<FAQProps> = ({ isLoaded }) => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    resetOnExit: false
  });

  const toggleItem = (index: number) => {
    setOpenItemId(openItemId === index ? null : index);
  };

  const filteredItems = selectedCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className="max-w-4xl mx-auto">
          <h2 className={`text-5xl font-playfair text-center mb-4 gold-text transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-xl font-cormorant text-center mb-12 text-foreground/80 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Everything you need to know about our wedding
          </p>
          
          {/* Category Filters */}
          <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {['all', 'general', 'venue', 'registry', 'travel'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-foreground/70 hover:bg-primary/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Accordion */}
          <div className={`space-y-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {filteredItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-primary/10"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-primary/5 transition-colors duration-300"
                >
                  <span className="font-playfair text-lg">{item.question}</span>
                  <span className="text-2xl transform transition-transform duration-300 text-primary/70">
                    {openItemId === index ? '−' : '+'}
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItemId === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 pt-0 font-cormorant text-foreground/80 text-lg">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Contact */}
          <div className={`mt-12 text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-foreground/80 font-cormorant">
              Don't see your question? Feel free to contact us at{' '}
              <a href="mailto:wedding@example.com" className="text-primary hover:underline">
                wedding@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 