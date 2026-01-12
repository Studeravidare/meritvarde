import React, { useState } from "react";
import type { Course, Grade } from "../../types/merit";
import "./InputCourses.css";

interface InputCoursesProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const VALID_POINTS = [50, 100, 150, 200, 300];
const GRADES: Grade[] = ["A", "B", "C", "D", "E", "F"];

const InputCourses: React.FC<InputCoursesProps> = ({ courses, setCourses }) => {
  const [name, setName] = useState("");
  const [points, setPoints] = useState<number>(100);
  const [grade, setGrade] = useState<Grade>("E");
  const [isExtended, setIsExtended] = useState(false);
  const [meritPoints, setMeritPoints] = useState(0);

  const handleAdd = () => {
    if (!name.trim()) {
      alert("Ange kursnamn");
      return;
    }

    const newCourse: Course = {
      id: Date.now(),
      name,
      points,
      grade,
      isExtended,
      meritPoints,
    };

    setCourses([...courses, newCourse]);

    // Reset
    setName("");
    setPoints(100);
    setGrade("E");
    setIsExtended(false);
    setMeritPoints(0);
  };

  return (
    <div className="input-courses">
      <h3>Lägg till ny kurs</h3>

      <input
        type="text"
        placeholder="Kursnamn t.ex. Matematik 4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <select value={grade} onChange={(e) => setGrade(e.target.value as Grade)}>
        {GRADES.map((g) => (
          <option key={g} value={g}>
            {g}
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

      <label>
        <input
          type="checkbox"
          checked={isExtended}
          onChange={(e) => setIsExtended(e.target.checked)}
        />
        Utökad kurs
      </label>

      <button onClick={handleAdd}>Lägg till kurs</button>
    </div>
  );
};

export default InputCourses;
