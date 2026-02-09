import React, { useEffect, useState } from "react";
import InputCourses from "../InputCourses/InputCourses";
import SavedSubjects from "../SavedSubjects/SavedSubjects";
import EducationSuggestions from "../EducationSuggestions/EducationSuggestions";
import type { Course } from "../../types/merit";
import { calculateMeritValue } from "../MeritCalc/calculateMerit";
import { educations } from "../../data/educations";
import "./counter.css";

const Counter: React.FC = () => {
  // useStates för kurser, merit och utbildningsförslag
  const [courses, setCourses] = useState<Course[]>([]);
  const [meritValue, setMeritValue] = useState<number | null>(null);
  const [educationSuggestions, setEducationSuggestions] = useState<any[]>([]);

  // Ta bort kurs
  const deleteCourse = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // useEffect för "courses"
  useEffect(() => {
    // Om kurser är tomt, töm
    if (courses.length === 0) {
      setMeritValue(null);
      setEducationSuggestions([]);
      return;
    }

    // Räkna ENDAST poäng som inte är utökade (2400-regeln)
    const qualifyingPoints = courses.reduce(
      (sum, c) => sum + (c.isExtended ? 0 : c.points),
      0,
    );

    // Ta fram nya merit
    const merit = calculateMeritValue(courses);
    // Spara merit
    setMeritValue(merit);

    // Visa inga utbildningsförslag före 2400p
    if (qualifyingPoints < 2400) {
      setEducationSuggestions([]);
      return;
    }

    // Hämta utbildningsförslag (lokal exempeldatat istället för backend)
    const range = Math.min(20, Math.floor(merit / 2) * 2);

    // Filtrera utbildningar baserat på merit-range
    const filtered = educations.filter((u) => u.minMerit === range);

    // Spara
    setEducationSuggestions(filtered);
  }, [courses]); // Körs när courses ändras

  // Skickas till EducationSuggestions (samma 2400-logik)
  const qualifyingPoints = courses.reduce(
    (sum, c) => sum + (c.isExtended ? 0 : c.points),
    0,
  );

  return (
    <div className="counter-columns">
      {/* Kolumn 1, inputs */}
      <div className="input-column">
        <InputCourses courses={courses} setCourses={setCourses} />
      </div>

      {/* Kolumn 2, kurser och merit */}
      <div className="saved-courses-column">
        <SavedSubjects
          courses={courses}
          deleteCourse={deleteCourse}
          meritValue={meritValue}
        />
      </div>

      {/* Kolumn 3, utbildingsförslag */}
      <div className="education-column">
        <EducationSuggestions
          meritValue={meritValue}
          suggestions={educationSuggestions}
          qualifyingPoints={qualifyingPoints}
        />
      </div>
    </div>
  );
};

export default Counter;
