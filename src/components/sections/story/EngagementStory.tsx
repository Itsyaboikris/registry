"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './EngagementStory.module.css';

interface StoryMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

// Sample relationship milestones
const milestones: StoryMilestone[] = [
  {
    id: '1',
    date: 'February 23, 2020',
    title: 'First Met',
    description: 'We first met at church camp Feb 2020. We started talking and shared things we had in common. It was the beginning of a great friendship.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b3ce551'
  },
  {
    id: '2',
    date: 'July 23, 2022',
    title: 'First Date',
    description: 'Our first date was a special moment that marked the beginning of our romantic journey together.',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485'
  },
  {
    id: '3',
    date: 'December 4, 2022',
    title: 'Made It Official',
    description: 'We officially became a couple, taking our friendship to the next level and beginning our romantic relationship.',
    image: 'https://images.unsplash.com/photo-1439539698758-ba2680ecadb9'
  },
  {
    id: '4',
    date: 'October 5, 2024',
    title: 'The Proposal',
    description: 'The magical moment when we decided to spend the rest of our lives together.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc'
  }
];

interface EngagementStoryProps {
  isLoaded: boolean;
}

export const EngagementStory: React.FC<EngagementStoryProps> = ({ isLoaded }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(true);
    }
  }, [isLoaded]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-5xl font-playfair mb-4 gold-text">Our Story</h2>
            <p className="text-xl font-cormorant text-foreground/80">
              From friendship to forever
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-[#faf7f2] p-8 rounded-lg shadow-lg border border-primary/10">
                  <div className="text-center mb-6">
                    <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full">
                      {milestone.date}
                    </span>
                  </div>
                  <h3 className="text-3xl font-playfair mb-4 text-center">{milestone.title}</h3>
                  <p className="font-cormorant text-lg text-foreground/80 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 