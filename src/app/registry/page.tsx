"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GiftDetails {
  firstName: string;
  lastName: string;
  bankName: string;
  accountType: string;
  accountNumber: string;
  accountCurrency: string;
}

interface Gift {
  title: string;
  description: string;
  link: string;
  details?: GiftDetails;
}

export default function Registry() {
  const [showHoneymoonDetails, setShowHoneymoonDetails] = useState(false);

  const gifts: Gift[] = [
    {
      title: "Honeymoon Fund",
      description: "Help us create unforgettable memories on our dream honeymoon.",
      link: "#",
      details: {
        firstName: "KRISTI",
        lastName: "RILEY",
        bankName: "Scotiabank",
        accountType: "CHEQUING",
        accountNumber: "605252414012",
        accountCurrency: "TTD"
      }
    },
    {
      title: "Home Essentials",
      description: "Contribute to our new home together.",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair text-4xl text-center mb-2">Gift Registry</h1>
        <p className="font-cormorant text-xl text-center mb-12">Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've created this registry.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gifts.map((gift, index) => (
            <Card key={index} className="p-6 border-primary/20 hover:shadow-md transition-shadow">
              <h3 className="font-playfair text-2xl mb-2">{gift.title}</h3>
              <p className="font-cormorant text-lg mb-4">{gift.description}</p>
              
              {gift.title === "Honeymoon Fund" ? (
                <div>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary/10 mb-4"
                    onClick={() => setShowHoneymoonDetails(!showHoneymoonDetails)}
                  >
                    {showHoneymoonDetails ? "Hide Details" : "View Details"}
                  </Button>
                  
                  {showHoneymoonDetails && gift.details && (
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <h4 className="font-playfair text-lg mb-3 text-primary">Bank Transfer Details</h4>
                      <div className="space-y-2 font-cormorant text-sm">
                        <div><strong>First name:</strong> {gift.details.firstName}</div>
                        <div><strong>Last name:</strong> {gift.details.lastName}</div>
                        <div><strong>Bank name:</strong> {gift.details.bankName}</div>
                        <div><strong>Account type:</strong> {gift.details.accountType}</div>
                        <div><strong>Account number:</strong> {gift.details.accountNumber}</div>
                        <div><strong>Account currency:</strong> {gift.details.accountCurrency}</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Link href={gift.link}>View Details</Link>
                </Button>
              )}
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/">Back to Invitation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}