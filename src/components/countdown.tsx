"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string; // Format: "YYYY-MM-DD"
}

export function Countdown({ targetDate }: CountdownProps) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const calculateTimeLeft = () => {
      const target = new Date(targetDate);
      target.setHours(23, 59, 59, 999); // Set to end of day
      
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      
      if (difference <= 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }
      
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      
      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    };
    
    calculateTimeLeft(); // Calculate immediately
    
    const interval = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);
  
  if (!isClient) {
    return (
      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center min-w-[80px]">
          <div className="text-6xl font-playfair gold-text">-</div>
          <div className="text-sm font-cormorant text-white/90 uppercase tracking-wider">Days</div>
        </div>
        <div className="flex flex-col items-center min-w-[80px]">
          <div className="text-6xl font-playfair gold-text">-</div>
          <div className="text-sm font-cormorant text-white/90 uppercase tracking-wider">Hours</div>
        </div>
        <div className="flex flex-col items-center min-w-[80px]">
          <div className="text-6xl font-playfair gold-text">-</div>
          <div className="text-sm font-cormorant text-white/90 uppercase tracking-wider">Minutes</div>
        </div>
        <div className="flex flex-col items-center min-w-[80px]">
          <div className="text-6xl font-playfair gold-text">-</div>
          <div className="text-sm font-cormorant text-white/90 uppercase tracking-wider">Seconds</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center gap-8">
      <div className="flex flex-col items-center min-w-[80px]">
        <div className="text-6xl font-playfair gold-text">{days}</div>
        <div className="text-sm font-cormorant text-white/90 uppercase tracking-wider">Days</div>
      </div>
      <div className="flex flex-col items-center min-w-[80px]">
        <div className="text-6xl font-playfair gold-text">{hours}</div>
        <div className="text-sm font-cormorant text-white/90 uppercase tracking-wider">Hours</div>
      </div>
      <div className="flex flex-col items-center min-w-[80px]">
        <div className="text-6xl font-playfair gold-text">{minutes}</div>
        <div className="text-sm font-cormorant text-white/90 uppercase tracking-wider">Minutes</div>
      </div>
      <div className="flex flex-col items-center min-w-[80px]">
        <div className="text-6xl font-playfair gold-text">{seconds}</div>
        <div className="text-sm font-cormorant text-white/90 uppercase tracking-wider">Seconds</div>
      </div>
    </div>
  );
}