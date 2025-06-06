"use client";

import { useState, useEffect } from "react";
import { Hero } from '@/components/sections/hero/Hero';
import { Couple } from '@/components/sections/couple/Couple';
import { Timeline } from '@/components/sections/timeline/Timeline';
import { WeddingDetails } from '@/components/sections/details/WeddingDetails';
import { Gallery } from '@/components/sections/gallery/Gallery';
import { EngagementStory } from '@/components/sections/story/EngagementStory';
import { FAQ } from '@/components/sections/faq/FAQ';
import { MusicPlaylist } from '@/components/sections/music/MusicPlaylist';
import { GuestBook } from '@/components/sections/guestbook/GuestBook';
import { RSVP } from '@/components/sections/rsvp/RSVP';
import { ParticlesBackground } from '@/components/animations/ParticlesBackground';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Background Particles Animation */}
      <ParticlesBackground />
      
      {/* Hero Section */}
      <Hero isLoaded={isLoaded} />
      
      {/* Couple Information */}
      <Couple isLoaded={isLoaded} />
      
      {/* Our Story */}
      <EngagementStory isLoaded={isLoaded} />
      
      {/* Wedding Timeline */}
      <Timeline isLoaded={isLoaded} />
      
      {/* Wedding Details */}
      <WeddingDetails isLoaded={isLoaded} />
      
      {/* Photo Gallery */}
      <Gallery isLoaded={isLoaded} />
      
      {/* FAQ Section */}
      <FAQ isLoaded={isLoaded} />
      
      {/* Music Playlist */}
      <MusicPlaylist isLoaded={isLoaded} />
      
      {/* Guest Book */}
      <GuestBook isLoaded={isLoaded} />
      
      {/* RSVP Section */}
      <RSVP isLoaded={isLoaded} />
    </main>
  );
}