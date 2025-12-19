// MeritCalculator.tsx
import React from "react";
import type { Course } from "../../types/merit";
import { calculateMeritValue } from "./calculateMerit";
import "./MeritCalculator.css";

// Interface för props
interface MeritCalculatorProps {
  courses: Course[];
  setMeritValue: (value: number) => void;
  setEducationSuggestions: (suggestions: any[]) => void;
}

const MeritCalculator: React.FC<MeritCalculatorProps> = ({
  courses,
  setMeritValue,
  setEducationSuggestions,
}) => {
  const handleCalculate = async () => {
    // Beräkna meritvärdet baserat på kurser
    const merit = calculateMeritValue(courses);
    setMeritValue(merit);

    try {
      // Hämta utbildningar från backend
      const res = await fetch(
        `http://localhost:3000/utbildningar?meritvärde=${merit.toFixed(2)}`
      );
      if (!res.ok) throw new Error("Misslyckades att hämta utbildningar");

      const suggestions = await res.json();
      setEducationSuggestions(suggestions);
    } catch (err) {
      console.error(err);
      setEducationSuggestions([]);
    }
  };

  return (
    <div className="merit-container">
      <button className="beraknaBtn" onClick={handleCalculate}>
        Beräkna meritvärde
      </button>
    </div>
  );
};

export default MeritCalculator;
