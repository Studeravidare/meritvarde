import React from "react";

/* Interfaces */
interface Suggestion {
  namn: string;
  minMerit: number;
  beskrivning: string;
}

interface Props {
  meritValue: number | null;
  suggestions: Suggestion[];
}

// Funktionen för suggestion
const EducationSuggestion: React.FC<Props> = ({ meritValue, suggestions }) => {
  // Om ingen passar
  if (!meritValue || !suggestions || suggestions.length === 0) {
    return <p>Inga utbildningar hittades</p>;
  }

  // Beräkna intervallet för meritvärdet (2 poäng steg)
  const lowerStep = Math.floor(meritValue / 2) * 2;
  const upperStep = lowerStep + 2;

  // Filtrera utbildningar som ligger inom intervallet
  const filtered = suggestions.filter(
    (u) => u.minMerit >= lowerStep && u.minMerit <= upperStep
  );

  if (filtered.length === 0) return <p>Inga utbildningar i ditt intervall</p>;

  /* Utskrift */
  return (
    <div>
      <h3>
        Utbildningar för meritvärde {meritValue.toFixed(2)} (steg {lowerStep}-
        {upperStep})
      </h3>
      <ul>
        {filtered.map((u, i) => (
          <li key={i}>
            <strong>{u.namn}</strong> – {u.beskrivning}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationSuggestion;
