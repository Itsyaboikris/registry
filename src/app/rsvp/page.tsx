"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { submitRSVP, checkExistingRSVP } from "@/lib/firebase/rsvp";

// RSVP deadline: September 20, 2025 at midnight UTC
const RSVP_DEADLINE = new Date('2025-09-21T00:00:00Z'); // September 21st at midnight UTC = September 20th end

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guestCount: "1",
    attending: "yes",
    dietaryRestrictions: "",
    message: "",
    guestNames: ["", "", ""] // For up to 4 guests (including the main guest)
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  
  // Check if deadline has passed on component mount
  useEffect(() => {
    const now = new Date();
    const isPassed = now >= RSVP_DEADLINE;
    console.log('RSVP Deadline Check:', {
      currentTime: now.toISOString(),
      deadline: RSVP_DEADLINE.toISOString(),
      isPassed: isPassed
    });
    setIsDeadlinePassed(isPassed);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuestNameChange = (index: number, value: string) => {
    const newGuestNames = [...formData.guestNames];
    newGuestNames[index] = value;
    setFormData(prev => ({ ...prev, guestNames: newGuestNames }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if deadline has passed before processing
    const now = new Date();
    if (now >= RSVP_DEADLINE) {
      setSubmitError("RSVP deadline has passed. We're sorry, but we can no longer accept responses.");
      return;
    }
    
    // Basic validation
    if (!formData.name || !formData.email) {
      setSubmitError("Please fill out your name and email.");
      return;
    }

    // Validate guest names if attending
    if (formData.attending === "yes") {
      const guestCount = parseInt(formData.guestCount);
      for (let i = 1; i < guestCount; i++) {
        if (!formData.guestNames[i] || formData.guestNames[i].trim() === "") {
          setSubmitError(`Please provide the name for guest ${i + 1}.`);
          return;
        }
      }
    }
    
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // Check if this email has already submitted an RSVP
      const existingRsvp = await checkExistingRSVP(formData.email);
      
      if (existingRsvp) {
        setSubmitError("An RSVP with this email already exists. Please contact us if you need to update your response.");
        setIsSubmitting(false);
        return;
      }
      
      // Prepare guest names array
      const guestNames = [formData.name];
      const guestCount = parseInt(formData.guestCount);
      for (let i = 1; i < guestCount; i++) {
        guestNames.push(formData.guestNames[i]);
      }
      
      // Submit to Firebase
      await submitRSVP({
        name: formData.name,
        email: formData.email,
        attending: formData.attending === "yes",
        guestCount: guestCount,
        guestNames: guestNames,
        dietaryRestrictions: formData.dietaryRestrictions,
        message: formData.message
      });
      
      // Show success message and reset form
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        guestCount: "1",
        attending: "yes",
        dietaryRestrictions: "",
        message: "",
        guestNames: ["", "", ""]
      });
      
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setSubmitError("There was an error submitting your RSVP. Please try again later.");
    }
    
    setIsSubmitting(false);
  };
  
  // Show missed RSVP message if deadline has passed
  if (isDeadlinePassed) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white p-12 rounded-lg shadow-xl text-center border border-primary/10">
          <h1 className="text-4xl font-playfair mb-8 text-primary">Missed RSVP</h1>
          <div className="space-y-6 text-lg font-cormorant text-foreground/80 leading-relaxed">
            <p>We're sorry you can't make it to our wedding. Our RSVP deadline has passed and you unfortunately did not respond.</p>
            <p>We would have loved to have you attend but final numbers have now been turned in and your presence will be missed.</p>
          </div>
          <div className="mt-8">
            <Link 
              href="/" 
              className="inline-block px-8 py-4 border-2 border-primary text-primary font-cormorant text-xl uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-playfair mb-4 text-primary">Thank You!</h1>
          <p className="text-lg font-cormorant mb-6">
            Your RSVP has been submitted successfully. We can't wait to celebrate with you!
          </p>
          <p className="text-sm text-foreground/60">
            Please respond by September 20th, 2025
          </p>
        </div>
      </div>
    );
  }

  const guestCount = parseInt(formData.guestCount);

  return (
    <div className="min-h-screen bg-[#faf7f2] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-playfair mb-4 gold-text">RSVP</h1>
            <p className="text-xl font-cormorant text-foreground/80">
              Please respond by September 20th, 2025
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-xl border border-primary/10">
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
                <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="attending" className="block text-sm font-medium text-foreground/80 mb-1">
                  Will you be attending? *
                </label>
                <select
                  id="attending"
                  name="attending"
                  value={formData.attending}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                >
                  <option value="yes">Yes, I will attend</option>
                  <option value="no">No, I cannot attend</option>
                </select>
              </div>
              
              {formData.attending === "yes" && (
                <>
                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-medium text-foreground/80 mb-1">
                      Number of Guests *
                    </label>
                    <select
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>

                  {/* Additional Guest Names */}
                  {guestCount > 1 && (
                    <div className="space-y-4">
                      <h3 className="font-playfair text-lg text-primary">Additional Guest Names</h3>
                      {Array.from({ length: guestCount - 1 }, (_, index) => (
                        <div key={index}>
                          <label htmlFor={`guest-${index + 2}`} className="block text-sm font-medium text-foreground/80 mb-1">
                            Guest {index + 2} Name *
                          </label>
                          <input
                            type="text"
                            id={`guest-${index + 2}`}
                            value={formData.guestNames[index + 1]}
                            onChange={(e) => handleGuestNameChange(index + 1, e.target.value)}
                            className="w-full p-3 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder={`Enter full name for guest ${index + 2}`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-foreground/80 mb-1">
                      Dietary Restrictions
                    </label>
                    <input
                      type="text"
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Any dietary restrictions or allergies?"
                    />
                  </div>
                </>
              )}
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Any additional message for the couple?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-primary text-white font-cormorant text-xl uppercase tracking-wider rounded-md hover:bg-primary/90 transition-all duration-300 disabled:bg-primary/50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}