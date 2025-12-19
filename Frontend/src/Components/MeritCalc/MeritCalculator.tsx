import React, { useState } from "react";
import "./MeritCalculator.css";

// Definierar en interface för kurser

interface Course {
  id: number;
  course: string;
  point: number;
  grade: string;
}

// Props för MeritCalculator-komponenten

interface MeritCalculatorProps {
  courses: Course[]; // En array av kurser där varje kurs följer Course-interfacet.
  setMeritValue: (value: number) => void; // En funktion som uppdaterar meritvärdet.
  setEducationSuggestions: (suggestions: any[]) => void; // En funktion som uppdaterar listan med utbildningsförslag.
}

// Mappning av betyg till poäng enligt det svenska skolsystemet

const gradeToPoints: Record<string, number> = {
  A: 20,
  B: 17.5,
  C: 15,
  D: 12.5,
  E: 10,
  F: 0,
};

// Funktion för att räkna ut meritvärdet baserat på kurserna

const calculateMeritValue = (courses: Course[]): number => {
  if (courses.length === 0) return 0;
  let totalWeightedPoints = 0;
  let totalPoints = 0;

  // Loopar igenom alla kurser och beräknar viktade poäng

  courses.forEach(({ point, grade }) => {
    totalWeightedPoints += (gradeToPoints[grade] || 0) * point;
    totalPoints += point;
  });

  // Returnerar det genomsnittliga meritvärdet

  return totalPoints > 0 ? totalWeightedPoints / totalPoints : 0;
};

// Funktion för att hämta utbildningsförslag baserat på meritvärdet

const fetchEducationSuggestions = async (meritValue: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/utbildningar?meritvärde=${meritValue}`
    );
    if (!response.ok) throw new Error("Kunde inte hämta utbildningar.");
    return await response.json();
  } catch (error) {
    console.error("Fel vid hämtning av utbildningar:", error);
    return [];
  }
};

const MeritCalculator: React.FC<MeritCalculatorProps> = ({
  courses,
  setMeritValue,
  setEducationSuggestions,
}) => {
  const [loading, setLoading] = useState(false);
  const [localMeritValue, setLocalMeritValue] = useState<number | null>(null);

  // Hanterar knapptryck för att beräkna meritvärde

  const handleCalculate = async () => {
    setLoading(true);
    const merit = calculateMeritValue(courses);
    setMeritValue(merit);
    setLocalMeritValue(merit);
    const suggestions = await fetchEducationSuggestions(merit);
    setEducationSuggestions(suggestions);
    setLoading(false);
  };

  return (
    <div className="merit-container">
      {/* Knapp för att starta beräkning av meritvärde */}

      <button
        className="beraknaBtn"
        onClick={handleCalculate}
        disabled={loading}
      >
        {loading ? "Laddar..." : "Beräkna meritvärde"}
      </button>
      <h3>
        {localMeritValue !== null
          ? `Ditt meritvärde: ${localMeritValue.toFixed(2)}`
          : ""}
      </h3>
    </div>
  );
};

export default MeritCalculator;
