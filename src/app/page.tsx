"use client";

import { useState, useEffect } from "react";
import { Hero } from '@/components/sections/hero/Hero';
import { Couple } from '@/components/sections/couple/Couple';
import { Timeline } from '@/components/sections/timeline/Timeline';
import { WeddingDetails } from '@/components/sections/details/WeddingDetails';
import { RSVP } from '@/components/sections/rsvp/RSVP';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero isLoaded={isLoaded} />
      <Couple isLoaded={isLoaded} />
      <Timeline isLoaded={isLoaded} />
      <WeddingDetails isLoaded={isLoaded} />
      <RSVP isLoaded={isLoaded} />
    </main>
  );
}