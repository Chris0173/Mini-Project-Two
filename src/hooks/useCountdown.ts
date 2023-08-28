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
  const [countdown, setCountdown] = useState(calculateCountdown(eventDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(eventDate));
    }, 1000); // Update countdown every second

    return () => clearInterval(interval);
  }, [eventDate, selectedFormat]);

  // Formatting based on the selectedFormat
  const totalHours = countdown.days * 24 + countdown.hours;
  const totalMinutes = totalHours * 60 + countdown.minutes;
  const totalSeconds = totalMinutes * 60 + countdown.seconds;
  
  const formattedCountdown =
    selectedFormat === "days"
      ? `${countdown.days} Days`
      : selectedFormat === "hours"
      ? `${totalHours} Hours`
      : selectedFormat === "minutes"
      ? `${totalMinutes} Minutes`
      : selectedFormat === "seconds"
      ? `${totalSeconds} Seconds`
      : `${countdown.formattedCountdown}`;

  return { ...countdown, formattedCountdown };
};

export default useCountdown;
