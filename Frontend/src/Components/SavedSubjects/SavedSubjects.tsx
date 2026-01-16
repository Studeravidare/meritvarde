import React from "react";
import type { Course } from "../../types/merit";
import "./SavedSubjects.css";

// Interface för props i SavedSubjects
interface SavedSubjectsProps {
  // Kurs array
  courses: Course[];
  // Ta bort kurs funktion
  deleteCourse: (id: number) => void;
  // Meritvärde, med nummer eller null
  meritValue: number | null;
}

// Kurser utskrift
const SavedSubjects: React.FC<SavedSubjectsProps> = ({
  courses,
  deleteCourse,
  meritValue,
}) => {
  // Beräkna ENDAST poäng som räknas mot 2400 (ej utökade)
  const totalPoints = courses.reduce(
    (sum, c) => sum + (c.isExtended ? 0 : c.points),
    0
  );

  return (
    <div className="saved-courses">
      <h3>Sparade kurser</h3>

      {/* Utskrift av poäng */}
      <div className="summary">
        <p>
          Meritvärde:{" "}
          {meritValue === null ? "—" : meritValue.toFixed(2) + "/22.50"}
        </p>
        <p>Totala kurspoäng: {totalPoints}/2400</p>
      </div>

      <div className="progress-wrapper">
        <div
          className="progress-bar"
          style={{
            width: `${Math.min((totalPoints / 2400) * 100, 100)}%`,
          }}
        />
      </div>

      {/* Om kurs är tom */}
      {courses.length === 0 ? (
        <p>Inga kurser tillagda ännu.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id} className="saved-course-item">
              <div className="course-info">
                <strong className="course-name">{course.name}</strong>
                <div className="course-meta">
                  <span className="course-points">{course.points}p</span>
                  <span className={`course-grade grade-${course.grade}`}>
                    {course.grade}
                  </span>
                  {course.meritPoints > 0 && (
                    <span className="course-merit">
                      +{course.meritPoints} merit
                    </span>
                  )}
                  {course.isExtended && (
                    <span className="course-extended">Utökad</span>
                  )}
                </div>
              </div>
              <button onClick={() => deleteCourse(course.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedSubjects;
