import { useState, useEffect } from "react";

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formattedCountdown: string; // Add this line
}

const calculateCountdown = (eventDate: Date): CountdownResult => {
  const now = new Date();
  const timeRemaining = eventDate.getTime() - now.getTime();

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  const formattedCountdown = `${days}d ${hours}h ${minutes}m ${seconds}s`; // Format as desired

  return { days, hours, minutes, seconds, formattedCountdown };
};

export const useCountdown = (eventDate: Date, selectedFormat: string): CountdownResult => {
  console.log("useCountdown called with selected format:", selectedFormat);
  const [countdown, setCountdown] = useState(calculateCountdown(eventDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(eventDate));
    }, 1000); // Update countdown every second

    return () => clearInterval(interval);
  }, [eventDate, selectedFormat]);

  // Formatting based on the selectedFormat
  const formattedCountdown =
    selectedFormat === "days"
      ? `${countdown.days}d`
      : selectedFormat === "hours"
      ? `${countdown.hours}h`
      : selectedFormat === "minutes"
      ? `${countdown.minutes}m`
      : selectedFormat === "seconds"
      ? `${countdown.seconds}s`
      : `${countdown.formattedCountdown}`;

  return { ...countdown, formattedCountdown };
};

export default useCountdown;
