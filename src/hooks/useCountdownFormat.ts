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
  const updateSelectedFormat = (newFormat: string) => {
    console.log("Updating selected format to:", newFormat);
    setSelectedFormat(newFormat);
  };

  return { countdownFormatOptions, selectedFormat, setSelectedFormat: updateSelectedFormat };
}