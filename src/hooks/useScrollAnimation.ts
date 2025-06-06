import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationProps {
  threshold?: number;
  rootMargin?: string;
  resetOnExit?: boolean;
}

export const useScrollAnimation = ({ 
  threshold = 0.1, 
  rootMargin = '0px',
  resetOnExit = false
}: UseScrollAnimationProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility based on intersection
        setIsVisible(entry.isIntersecting);
        
        // If resetOnExit is true, we'll keep observing
        // Otherwise, we can stop observing once the element is visible
        if (!resetOnExit && entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, resetOnExit]);

  return { elementRef, isVisible };
}; 