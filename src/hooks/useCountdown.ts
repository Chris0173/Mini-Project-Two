// useCountdown.ts
import { useState, useEffect } from "react";

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateCountdown = (eventDate: Date): CountdownResult => {
  const now = new Date();
  const timeRemaining = eventDate.getTime() - now.getTime();

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const useCountdown = (eventDate: Date): CountdownResult => {
  const [countdown, setCountdown] = useState(calculateCountdown(eventDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(eventDate));
    }, 1000); // Update countdown every second

    return () => clearInterval(interval);
  }, [eventDate]);

  return countdown;
};

export default useCountdown;
