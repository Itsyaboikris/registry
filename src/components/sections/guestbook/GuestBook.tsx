"use client";

import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface GuestMessage {
  id: string;
  name: string;
  relationship: string;
  message: string;
  date: string;
}

// Sample guest messages - these would typically come from a database
const initialMessages: GuestMessage[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    relationship: 'Bride\'s Friend',
    message: 'Wishing you both a lifetime of love and happiness. Your love story is beautiful!',
    date: '2023-05-15'
  },
  {
    id: '2',
    name: 'James Wilson',
    relationship: 'Groom\'s Brother',
    message: 'So happy for you both! Can\'t wait to celebrate your special day with you.',
    date: '2023-05-14'
  },
  {
    id: '3',
    name: 'Sophie Martinez',
    relationship: 'Cousin',
    message: 'You two are perfect for each other. Congratulations on your engagement!',
    date: '2023-05-10'
  }
];

interface GuestBookProps {
  isLoaded: boolean;
}

export const GuestBook: React.FC<GuestBookProps> = ({ isLoaded }) => {
  const [messages, setMessages] = useState<GuestMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState({ name: '', relationship: '', message: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    resetOnExit: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMessage(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newMessage.name || !newMessage.relationship || !newMessage.message) {
      setFormError('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    setFormError('');
    
    // Simulate API call to save message
    setTimeout(() => {
      const newGuestMessage: GuestMessage = {
        id: Date.now().toString(),
        name: newMessage.name,
        relationship: newMessage.relationship,
        message: newMessage.message,
        date: new Date().toISOString().split('T')[0]
      };
      
      setMessages(prev => [newGuestMessage, ...prev]);
      setNewMessage({ name: '', relationship: '', message: '' });
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-playfair text-center mb-4 gold-text transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Guest Book
          </h2>
          <p className={`text-xl font-cormorant text-center mb-12 text-foreground/80 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Leave your wishes and messages for our special day
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-white p-8 rounded-lg shadow-xl border border-primary/10">
                <h3 className="text-2xl font-playfair mb-6">Leave a Message</h3>
                
                {showSuccess && (
                  <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-md">
                    Thank you for your message! It has been added to our guest book.
                  </div>
                )}
                
                {formError && (
                  <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">
                    {formError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newMessage.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="relationship" className="block text-sm font-medium text-foreground/80 mb-1">
                      Your Relationship
                    </label>
                    <select
                      id="relationship"
                      name="relationship"
                      value={newMessage.relationship}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select your relationship</option>
                      <option value="Family">Family</option>
                      <option value="Friend">Friend</option>
                      <option value="Colleague">Colleague</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={newMessage.message}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Write your message..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-primary text-white font-cormorant text-lg uppercase tracking-wider rounded-md hover:bg-primary/90 transition-all duration-300 disabled:bg-primary/50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Sign Guest Book'}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Messages Display */}
            <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-white p-8 rounded-lg shadow-xl border border-primary/10 max-h-[600px] overflow-y-auto">
                <h3 className="text-2xl font-playfair mb-6">Messages</h3>
                
                {messages.length === 0 ? (
                  <p className="text-center text-foreground/60 italic">
                    Be the first to sign our guest book!
                  </p>
                ) : (
                  <div className="space-y-6">
                    {messages.map(message => (
                      <div key={message.id} className="border-b border-primary/10 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-playfair text-xl">{message.name}</h4>
                          <span className="text-sm text-foreground/60">{message.date}</span>
                        </div>
                        <p className="text-sm text-foreground/80 mb-2">
                          <span className="italic">{message.relationship}</span>
                        </p>
                        <p className="font-cormorant text-lg">{message.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 