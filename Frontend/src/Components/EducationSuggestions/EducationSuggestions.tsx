import React from "react";
import "./EducationSuggestions.css";

interface EducationSuggestionsProps {
  meritValue: number | null;
  suggestions: any[];
}

const EducationSuggestions: React.FC<EducationSuggestionsProps> = ({
  meritValue,
  suggestions,
}) => {
  if (!meritValue) return <p>Lägg till kurser och beräkna meritvärde.</p>;

  return (
    <div className="education-suggestions">
      <h3>Utbildningsförslag</h3>
      {suggestions.length === 0 ? (
        <p>Inga utbildningar matchar ditt meritvärde.</p>
      ) : (
        <ul>
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
