"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface StoryMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

// Sample relationship milestones
const milestones: StoryMilestone[] = [
  {
    id: '1',
    date: 'June 15, 2020',
    title: 'First Met',
    description: 'We first met at a mutual friend\'s birthday party. Sarah was wearing a blue dress, and Michael couldn\'t take his eyes off her.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b3ce551'
  },
  {
    id: '2',
    date: 'July 3, 2020',
    title: 'First Date',
    description: 'Our first date was at a small Italian restaurant downtown. We talked for hours and knew there was something special between us.',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485'
  },
  {
    id: '3',
    date: 'December 24, 2020',
    title: 'Made It Official',
    description: 'Michael asked Sarah to be his girlfriend on Christmas Eve under the stars. She said yes without hesitation.',
    image: 'https://images.unsplash.com/photo-1439539698758-ba2680ecadb9'
  },
  {
    id: '4',
    date: 'May 10, 2022',
    title: 'Moved In Together',
    description: 'We took the big step of moving into our first apartment together, along with our cat Milo.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf'
  },
  {
    id: '5',
    date: 'February 14, 2023',
    title: 'The Proposal',
    description: 'Michael proposed during a surprise weekend getaway to the mountains. Sarah cried tears of joy before saying yes.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc'
  }
];

interface EngagementStoryProps {
  isLoaded: boolean;
}

export const EngagementStory: React.FC<EngagementStoryProps> = ({ isLoaded }) => {
  const [activeMilestone, setActiveMilestone] = useState<string>(milestones[0].id);
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    resetOnExit: false
  });

  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-playfair text-center mb-4 gold-text transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our Story
          </h2>
          <p className={`text-xl font-cormorant text-center mb-16 text-foreground/80 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            The journey that led us to forever
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Timeline Navigation */}
            <div className={`col-span-1 lg:col-span-2 order-2 lg:order-1 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <button
                    key={milestone.id}
                    onClick={() => setActiveMilestone(milestone.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 border ${
                      activeMilestone === milestone.id
                        ? 'bg-primary/10 border-primary shadow-md'
                        : 'bg-white border-primary/10 hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        activeMilestone === milestone.id ? 'bg-primary' : 'bg-primary/30'
                      }`}></div>
                      <div>
                        <p className="text-sm text-foreground/60">{milestone.date}</p>
                        <h3 className={`font-playfair text-lg ${
                          activeMilestone === milestone.id ? 'text-primary' : 'text-foreground'
                        }`}>
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Story Display */}
            <div className={`col-span-1 lg:col-span-3 order-1 lg:order-2 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`bg-white p-6 rounded-lg shadow-xl border border-primary/10 transition-all duration-500 ${
                    activeMilestone === milestone.id
                      ? 'opacity-100 translate-y-0 h-auto'
                      : 'absolute opacity-0 -translate-y-4 invisible h-0'
                  }`}
                >
                  <div className="relative aspect-video w-full mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={milestone.image}
                      alt={milestone.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                  <h3 className="text-3xl font-playfair mb-2 text-primary">{milestone.title}</h3>
                  <p className="text-sm text-foreground/60 mb-4">{milestone.date}</p>
                  <p className="font-cormorant text-lg text-foreground/80 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quote */}
          <div className={`mt-16 text-center max-w-4xl mx-auto transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <blockquote className="italic text-2xl font-cormorant text-foreground/80 leading-relaxed">
              "And suddenly all the love songs were about you."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}; 