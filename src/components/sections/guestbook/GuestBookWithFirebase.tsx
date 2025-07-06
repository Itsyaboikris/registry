"use client";

import { useState, useEffect } from 'react';
import { submitGuestMessage } from '@/lib/firebase/guestbook';

// reCAPTCHA site key - must be set in environment variables
// const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

interface GuestBookWithFirebaseProps {
  isLoaded: boolean;
}

export const GuestBookWithFirebase: React.FC<GuestBookWithFirebaseProps> = ({ isLoaded }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(true);
    }
  }, [isLoaded]);

  // Initialize reCAPTCHA only if site key is available
  // if (RECAPTCHA_SITE_KEY) {
  //   const loadRecaptcha = () => {
  //     const script = document.createElement('script');
  //     script.src = 'https://www.google.com/recaptcha/api.js';
  //     script.async = true;
  //     script.defer = true;
  //     document.head.appendChild(script);
  //   };
  //   loadRecaptcha();
  // }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.relationship || !formData.message) {
      setSubmitError("Please fill out all fields.");
      return;
    }
    
    // Validate reCAPTCHA if enabled
    // if (RECAPTCHA_SITE_KEY) {
    //   const recaptchaResponse = window.grecaptcha?.getResponse();
    //   if (!recaptchaResponse) {
    //     setSubmitError("Please complete the reCAPTCHA verification.");
    //     return;
    //   }
    // }
    
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // Submit to Firebase
      await submitGuestMessage({
        name: formData.name,
        relationship: formData.relationship,
        message: formData.message
      });
      
      // Show success message and reset form
      setSubmitSuccess(true);
      setFormData({
        name: "",
        relationship: "",
        message: ""
      });
      
      // Reset reCAPTCHA
      // if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
      //   window.grecaptcha.reset();
      // }
      
    } catch (error) {
      console.error("Error submitting guest message:", error);
      setSubmitError("There was an error submitting your message. Please try again later.");
    }
    
    setIsSubmitting(false);
  };

  if (submitSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="p-4 bg-green-50 text-green-800 rounded-md">
          Thank you for your message! It has been submitted and will be reviewed before appearing on our guest book.
        </div>
        <button 
          onClick={() => setSubmitSuccess(false)}
          className="text-primary hover:underline font-cormorant"
        >
          Leave Another Message
        </button>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-5xl font-playfair mb-4 gold-text">Guest Book</h2>
            <p className="text-xl font-cormorant text-foreground/80">
              Leave a message for the happy couple
            </p>
          </div>
          
          <div className={`max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-[#faf7f2] p-8 rounded-lg shadow-xl border border-primary/10">
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="relationship" className="block text-sm font-medium text-foreground/80 mb-1">
                    Your Relationship to the Couple *
                  </label>
                  <select
                    id="relationship"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  >
                    <option value="">Select your relationship</option>
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Share your well wishes, memories, or advice for the couple..."
                    required
                  ></textarea>
                </div>
                
                {/* reCAPTCHA - only show if site key is available */}
                {/* {RECAPTCHA_SITE_KEY && (
                  <div className="flex justify-center">
                    <div className="g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY}></div>
                  </div>
                )} */}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-primary text-white font-cormorant text-xl uppercase tracking-wider rounded-md hover:bg-primary/90 transition-all duration-300 disabled:bg-primary/50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 