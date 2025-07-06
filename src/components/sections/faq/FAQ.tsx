"use client";

import { useState, useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'venue' | 'travel' | 'registry';
}

const faqItems: FAQItem[] = [
  {
    question: "When do I need to RSVP by?",
    answer: "Please RSVP by September 30th, 2025. You can RSVP by clicking the RSVP tab above or visiting our RSVP page.",
    category: 'general'
  },
  {
    question: "What if I can't make it?",
    answer: "Your presence will surely be missed. Please RSVP 'Will NOT attend' so we can plan accordingly. If you have already RSVP'd attending but find that you cannot make it, please notify us as soon as possible.",
    category: 'general'
  },
  {
    question: "What time is the wedding?",
    answer: "The ceremony begins at 2:30 PM. Please arrive at the venue NO later than 2:00 PM; if you arrive after the ceremony begins, you will not be able to be seated.",
    category: 'general'
  },
  {
    question: "Can I bring a date?",
    answer: "Your invitation will specify how many seats have been saved in your honour. Please respect our wishes as we're trying to keep our wedding an intimate celebration.",
    category: 'general'
  },
  {
    question: "What should I wear?",
    answer: "Semi-formal attire is requested. Please no jeans or denim pants.",
    category: 'general'
  },
  {
    question: "Can I wear white, ivory or cream colored attire?",
    answer: "No, please let the bride have her day! We kindly ask that guests avoid wearing white, ivory, or cream colored clothing.",
    category: 'general'
  },
  {
    question: "Where is the wedding?",
    answer: "The wedding will be held at Hilstein Manor, located at Corner Ragbir and McLean Street, St. Augustine, Trinidad and Tobago.",
    category: 'venue'
  },
  {
    question: "Is there parking available?",
    answer: "Yes, there is parking available at the venue. Security will direct you where to park upon arrival.",
    category: 'venue'
  },
  {
    question: "What if I have dietary restrictions?",
    answer: "Please include any dietary restrictions or allergies when you RSVP. We want to ensure everyone can enjoy the meal.",
    category: 'general'
  }
];

interface FAQProps {
  isLoaded: boolean;
}

export const FAQ: React.FC<FAQProps> = ({ isLoaded }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'general' | 'venue' | 'travel' | 'registry'>('general');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(true);
    }
  }, [isLoaded]);

  const toggleItem = (question: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(question)) {
      newOpenItems.delete(question);
    } else {
      newOpenItems.add(question);
    }
    setOpenItems(newOpenItems);
  };

  const filteredItems = faqItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-5xl font-playfair mb-4 gold-text">Frequently Asked Questions</h2>
            <p className="text-xl font-cormorant text-foreground/80">
              Everything you need to know about our special day
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {['general', 'venue'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as any)}
                className={`px-6 py-3 rounded-full font-cormorant text-lg transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* FAQ Items */}
          <div className={`space-y-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#faf7f2] rounded-lg border border-primary/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.question)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-playfair text-xl text-foreground">{item.question}</h3>
                  <span className={`text-primary text-2xl transition-transform duration-300 ${
                    openItems.has(item.question) ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openItems.has(item.question) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-4">
                    <p className="font-cormorant text-lg text-foreground/80 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 