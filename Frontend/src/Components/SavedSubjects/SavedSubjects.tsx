import React from "react";
import type { Course } from "../../types/merit";
import "./SavedSubjects.css";

interface SavedSubjectsProps {
  courses: Course[];
  deleteCourse: (id: number) => void;
  calculateMerit: () => void;
  meritValue: number | null;
}

const SavedSubjects: React.FC<SavedSubjectsProps> = ({
  courses,
  deleteCourse,
  calculateMerit,
  meritValue,
}) => {
  const totalPoints = courses.reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="saved-subjects">
      <h3>Sparade kurser</h3>
      <p>Totala poäng: {totalPoints}</p>

      {courses.length === 0 ? (
        <p>Inga kurser tillagda ännu.</p>
      ) : (
        <ul>
          {courses.map((c) => (
            <li key={c.id}>
              <span>
                <strong>{c.name}</strong> – {c.points} p – {c.grade}
                {c.isExtended && " (Utökad)"}
                {c.meritPoints > 0 && ` +${c.meritPoints} merit`}
              </span>
              <button onClick={() => deleteCourse(c.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={calculateMerit}>Beräkna meritvärde</button>

      {meritValue !== null && <p>Ditt meritvärde: {meritValue.toFixed(2)}</p>}
    </div>
  );
};

export default SavedSubjects;
