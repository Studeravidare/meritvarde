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
  // Om meritvärde är tomt
  if (!meritValue) return <p>Lägg till kurser och beräkna meritvärde.</p>;

  return (
    <div className="education-suggestions">
      <h3>Utbildningsförslag</h3>
      {suggestions.length === 0 ? (
        <p>Inga utbildningar matchar ditt meritvärde.</p>
      ) : (
        <ul>
          {/* Utskrift av utbildningsförslag */}
          {suggestions.map((s, i) => (
            <li key={i}>
              <strong>{s.namn}</strong>: {s.beskrivning}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EducationSuggestions;
