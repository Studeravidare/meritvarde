import React from "react";
import "./EducationSuggestions.css";

// Interface för att ge typ till props
// Typescript vänligt
interface Props {
  meritValue: number | null;
  suggestions: any[];
}

// Utskrift av educations (kallas i counter)
const EducationSuggestions: React.FC<Props> = ({ meritValue, suggestions }) => {
  return (
    <div className="education-suggestions">
      <h3>Utbildningsförslag</h3>

      {meritValue === null ? (
        <p className="empty-text">Lägg till kurser och beräkna meritvärde.</p>
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
