import React, { useState } from "react";
import type { Course, Grade } from "../../types/merit";
import "./InputCourses.css";

// Interface för course props
interface InputCoursesProps {
  /* Listan med kurser som ska visas av typen "Course" */
  courses: Course[];
  /* Funktion för att uppdatera kurslistan (Just nu setCourses från föräldern) */
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

// Poängval för kurser
const VALID_POINTS = [50, 100, 150, 200, 300];
// Betygval för kurser
const GRADES: Grade[] = ["A", "B", "C", "D", "E", "F"];

const InputCourses: React.FC<InputCoursesProps> = ({ courses, setCourses }) => {
  // Usestates för inputs
  const [name, setName] = useState("");
  const [points, setPoints] = useState<number>(100);
  const [grade, setGrade] = useState<Grade>("E");
  const [isExtended, setIsExtended] = useState(false);
  const [meritPoints, setMeritPoints] = useState(0);

  // Lägg till kurs
  const handleAdd = () => {
    // Om name är tomt
    if (!name.trim()) {
      alert("Ange kursnamn");
      return;
    }

    // Skapa kurs och lägg till i listan
    const newCourse: Course = {
      id: Date.now(),
      name,
      points,
      grade,
      isExtended,
      meritPoints,
    };

    setCourses([...courses, newCourse]);

    // Töm inputs
    setName("");
    setPoints(100);
    setGrade("E");
    setIsExtended(false);
    setMeritPoints(0);
  };

  return (
    // Utskrift av inputs
    <div className="input-container">
      <h3>Lägg till ny kurs</h3>

      <div className="input-courses">
        {/* Rad 1: Kursnamn + utökad */}
        <div className="row top-row">
          <input
            type="text"
            placeholder="Kursnamn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="extended">
            <input
              type="checkbox"
              checked={isExtended}
              onChange={(e) => setIsExtended(e.target.checked)}
            />
            Utökad kurs
          </label>
        </div>

        {/* Rad 2: Poäng / Betyg / Merit */}
        <div className="row select-row">
          <select
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          >
            {VALID_POINTS.map((points) => (
              <option key={points} value={points}>
                {points}p
              </option>
            ))}
          </select>

          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value as Grade)}
          >
            {GRADES.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>

          <select
            value={meritPoints}
            onChange={(e) => setMeritPoints(Number(e.target.value))}
          >
            <option value={0}>Ingen merit</option>
            <option value={0.5}>0,5</option>
            <option value={1}>1</option>
            <option value={1.5}>1,5</option>
          </select>
        </div>

        {/* Knapp */}
        <button onClick={handleAdd}>Lägg till kurs</button>
      </div>
      <div className="blog-redirect">
        <span>
          Läs mer om hur meritvärde beräknas på vårat{" "}
          <strong>
            <a
              href="https://studeravidare.se/meritvarde-och-snittbetyg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              blogginlägg!
            </a>
          </strong>
        </span>
      </div>
    </div>
  );
};

export default InputCourses;
