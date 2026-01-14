import React from "react";
import type { Course } from "../../types/merit";
import "./SavedSubjects.css";

interface SavedSubjectsProps {
  courses: Course[];
  deleteCourse: (id: number) => void;
  meritValue: number | null;
}

const SavedSubjects: React.FC<SavedSubjectsProps> = ({
  courses,
  deleteCourse,
  meritValue,
}) => {
  const totalPoints = courses.reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="saved-courses">
      <h3>Sparade kurser</h3>

      <p>Totala poäng: {totalPoints}</p>

      {meritValue !== null && (
        <p className="merit-value">Meritvärde: {meritValue.toFixed(2)}</p>
      )}

      {courses.length === 0 ? (
        <p>Inga kurser tillagda ännu.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id} className="saved-course-item">
              <span>
                <strong>{course.name}</strong> – {course.points} p –{" "}
                {course.grade}
                {course.isExtended && " (Utökad)"}
                {course.meritPoints > 0 && ` +${course.meritPoints} merit`}
              </span>
              <button onClick={() => deleteCourse(course.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedSubjects;
