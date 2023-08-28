import { useState } from "react";

export function useCountdownFormat() {
  const countdownFormatOptions = [
    { label: "Standard", value: "standard" },
    { label: "Days", value: "days" },
    { label: "Hours", value: "hours" },
    { label: "Minutes", value: "minutes" },
    { label: "Seconds", value: "seconds" },
  ];

  const [selectedFormat, setSelectedFormat] = useState("standard");

  return { countdownFormatOptions, selectedFormat, setSelectedFormat };
}