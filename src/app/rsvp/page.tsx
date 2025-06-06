"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { submitRSVP, checkExistingRSVP } from "@/lib/firebase/rsvp";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guestCount: "1",
    attending: "yes",
    dietaryRestrictions: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email) {
      setSubmitError("Please fill out your name and email.");
      return;
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
      
      // Submit to Firebase
      await submitRSVP({
        name: formData.name,
        email: formData.email,
        attending: formData.attending === "yes",
        guestCount: parseInt(formData.guestCount),
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
        message: ""
      });
      
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setSubmitError("There was an error submitting your RSVP. Please try again later.");
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf7f2] p-4">
      <Card className="max-w-md w-full p-8 shadow-lg border-primary/20">
        <h1 className="font-playfair text-3xl text-center mb-6">RSVP</h1>
        
        {submitSuccess ? (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-50 text-green-800 rounded-md">
              Thank you for your RSVP! We've received your response and look forward to celebrating with you.
            </div>
            <Link href="/" className="text-primary hover:underline font-cormorant inline-block">
              Return to Invitation
            </Link>
          </div>
        ) : (
          <>
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">
                {submitError}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="font-cormorant text-lg block">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="font-cormorant text-lg block">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="space-y-2">
                <label className="font-cormorant text-lg block">Number of Guests</label>
                <select 
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="font-cormorant text-lg block">Attending</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="attending" 
                      value="yes" 
                      checked={formData.attending === "yes"}
                      onChange={handleInputChange}
                      className="mr-2" 
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="attending" 
                      value="no" 
                      checked={formData.attending === "no"}
                      onChange={handleInputChange}
                      className="mr-2" 
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="font-cormorant text-lg block">Dietary Restrictions</label>
                <textarea 
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Please list any dietary restrictions"
                ></textarea>
              </div>
              
              <div className="space-y-2">
                <label className="font-cormorant text-lg block">Message (Optional)</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Any additional message for the couple"
                ></textarea>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit RSVP"}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <Link href="/" className="text-primary hover:underline font-cormorant">
                Back to Invitation
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}