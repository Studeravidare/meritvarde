import React from "react";
import type { Course } from "../../types/merit";
import "./MeritCalculator.css";

// Konstant för poäng
const GRADE_TO_POINTS: Record<string, number> = {
  A: 20,
  B: 17.5,
  C: 15,
  D: 12.5,
  E: 10,
  F: 0,
};

const MAX_MERIT_POINTS = 2.5;
const MAX_TOTAL = 22.5;

export const calculateMeritValue = (courses: Course[]): number => {
  let weightedSum = 0;
  let totalPoints = 0;
  let merit = 0;

  courses.forEach((c) => {
    if (!c.isExtended) {
      weightedSum += (GRADE_TO_POINTS[c.grade] || 0) * c.points;
      totalPoints += c.points;
    }
    merit += c.meritPoints;
  });

  if (totalPoints === 0) return 0;

  const average = weightedSum / totalPoints;
  const cappedMerit = Math.min(merit, MAX_MERIT_POINTS);
  return Math.min(average + cappedMerit, MAX_TOTAL);
};

interface Props {
  courses: Course[];
  setMeritValue: (value: number) => void;
  setEducationSuggestions: (suggestions: any[]) => void;
}

const MeritCalculator: React.FC<Props> = ({
  courses,
  setMeritValue,
  setEducationSuggestions,
}) => {
  const handleCalculate = async () => {
    const merit = calculateMeritValue(courses);
    setMeritValue(merit);

    try {
      const res = await fetch(`/utbildningar?meritvärde=${merit.toFixed(2)}`);
      if (!res.ok) throw new Error("Misslyckades att hämta utbildningar");
      const suggestions = await res.json();
      setEducationSuggestions(suggestions);
    } catch (err) {
      console.error(err);
      setEducationSuggestions([]);
    }
  };

  return (
    <div>
      <button onClick={handleCalculate}>Beräkna meritvärde</button>
    </div>
  );
};

export default MeritCalculator;
