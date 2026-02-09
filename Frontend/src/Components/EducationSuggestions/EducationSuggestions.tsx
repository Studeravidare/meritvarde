import React from "react";
import "./EducationSuggestions.css";

// Interface för att ge typ till props
// Typescript vänligt
interface Props {
  meritValue: number | null;
  suggestions: any[];
  qualifyingPoints: number;
}

// Utskrift av educations (kallas i counter)
const EducationSuggestions: React.FC<Props> = ({
  meritValue,
  suggestions,
  qualifyingPoints,
}) => {
  return (
    <div className="education-suggestions">
      <h3>Utbildningsförslag</h3>
      <h4>Förslag för ditt meritvärde</h4>

      {meritValue === null ? (
        <p className="empty-text">Lägg till kurser och beräkna meritvärde.</p>
      ) : qualifyingPoints < 2400 ? (
        <p className="empty-text">
          Du behöver minst 2400 gymnasiepoäng för att se utbildningsförslag.
        </p>
      ) : suggestions.length === 0 ? (
        <p className="empty-text">Inga utbildningar matchar ditt meritvärde.</p>
      ) : (
        <ul>
          {suggestions.map((s, i) => (
            <li key={i} className="education-item">
              <strong>{s.namn}</strong>
              <span>{s.beskrivning}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EducationSuggestions;
