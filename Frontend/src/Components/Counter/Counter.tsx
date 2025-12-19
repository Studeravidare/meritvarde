import React, { useState } from "react";
import MeritCalculator from "../MeritCalc/MeritCalculator";
import EducationSuggestion from "../EducationSuggestions/EducationSuggestions";
import type { Course, Grade } from "../../types/merit";
import "./counter.css";

/* CONSTANT */

const VALID_POINTS = [50, 100, 150, 200, 300];
const GRADES: Grade[] = ["A", "B", "C", "D", "E", "F"];

const Counter: React.FC = () => {
  // Kurs use states
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState("");
  // Default 100
  const [points, setPoints] = useState<number>(100);
  // Default E
  const [grade, setGrade] = useState<Grade>("E");
  // Default False
  const [isExtended, setIsExtended] = useState(false);
  // Default 0
  const [meritPoints, setMeritPoints] = useState<number>(0);

  const [meritValue, setMeritValue] = useState<number | null>(null);
  const [educationSuggestions, setEducationSuggestions] = useState<any[]>([]);

  // Lägg till kurs
  const handleAddCourse = () => {
    // Alert vid tomt namn
    if (!name.trim()) {
      alert("Ange kursnamn");
      return;
    }

    // Skapa ny constant
    const newCourse: Course = {
      id: Date.now(),
      name,
      points,
      grade,
      isExtended,
      meritPoints,
    };

    // Lägg till nya kurs
    setCourses((prev) => [...prev, newCourse]);

    // Reset
    setName("");
    setPoints(100);
    setGrade("E");
    setIsExtended(false);
    setMeritPoints(0);
  };

  // Ta bort kurs
  const deleteCourse = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="main-container">
      <div className="counter-container">
        <h2>Kurshanterare</h2>

        {/* Lägg till kurs */}
        <div className="input-section">
          <h3>Lägg till ny kurs</h3>

          <label>Kursnamn</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="t.ex. Matematik 4"
          />

          <label>Poäng</label>
          <select
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          >
            {VALID_POINTS.map((p) => (
              <option key={p} value={p}>
                {p} p
              </option>
            ))}
          </select>

          <label>Betyg</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value as Grade)}
          >
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <label>Meritpoäng</label>
          <select
            value={meritPoints}
            onChange={(e) => setMeritPoints(Number(e.target.value))}
          >
            <option value={0}>Ingen</option>
            <option value={0.5}>0,5</option>
            <option value={1.0}>1,0</option>
            <option value={1.5}>1,5</option>
          </select>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={isExtended}
              onChange={(e) => setIsExtended(e.target.checked)}
            />
            Utökad kurs
          </label>

          <button className="add-btn" onClick={handleAddCourse}>
            Lägg till kurs
          </button>
        </div>

        {/* Kurslista */}
        <div className="course-list">
          <h3>Dina kurser</h3>
          {courses.length === 0 ? (
            <p>Inga kurser tillagda ännu.</p>
          ) : (
            <ul>
              {courses.map((course) => (
                <li key={course.id} className="course-item">
                  <span>
                    <strong>{course.name}</strong> – {course.points} p –{" "}
                    {course.grade}
                    {course.isExtended && " (Utökad)"}
                    {course.meritPoints > 0 && ` +${course.meritPoints} merit`}
                  </span>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCourse(course.id)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Meritberäkning */}
        <MeritCalculator
          courses={courses}
          setMeritValue={setMeritValue}
          setEducationSuggestions={setEducationSuggestions}
        />
      </div>

      {/* Meritvärde och utbildningsförslag */}
      <div className="suggestions-container">
        {meritValue !== null && (
          <h3>Ditt meritvärde: {meritValue.toFixed(2)}</h3>
        )}
        <EducationSuggestion
          meritValue={meritValue}
          suggestions={educationSuggestions}
        />
      </div>
    </div>
  );
};

export default Counter;
