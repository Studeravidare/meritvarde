import React, { useState } from "react";
import InputCourses from "../InputCourses/InputCourses";
import SavedSubjects from "../SavedSubjects/SavedSubjects";
import EducationSuggestions from "../EducationSuggestions/EducationSuggestions";
import type { Course } from "../../types/merit";
import { calculateMeritValue } from "../MeritCalc/calculateMerit";
import "./counter.css";

const Counter: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [meritValue, setMeritValue] = useState<number | null>(null);
  const [educationSuggestions, setEducationSuggestions] = useState<any[]>([]);

  // Ta bort kurs
  const deleteCourse = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // Beräkna meritvärde
  const handleCalculate = async () => {
    if (courses.length === 0) {
      alert("Lägg till minst en kurs först!");
      return;
    }

    const merit = calculateMeritValue(courses);
    setMeritValue(merit);

    try {
      const res = await fetch(`/utbildningar?meritvärde=${merit.toFixed(2)}`);
      if (!res.ok) throw new Error("Misslyckades att hämta utbildningar");
      const suggestions = await res.json();
      setEducationSuggestions(suggestions);
    } catch (err) {
      console.error(err);
      setEducationSuggestions([]);
    }
  };

  return (
    <div className="counter-columns">
      {/* Kolumn 1: Input */}
      <div className="input-column">
        <InputCourses courses={courses} setCourses={setCourses} />
      </div>

      {/* Kolumn 2: Sparade kurser + knapp */}
      <div className="saved-courses-column">
        <SavedSubjects
          courses={courses}
          deleteCourse={deleteCourse}
          calculateMerit={handleCalculate}
          meritValue={meritValue}
        />
      </div>

      {/* Kolumn 3: Utbildningsförslag */}
      <div className="education-column">
        <EducationSuggestions
          meritValue={meritValue}
          suggestions={educationSuggestions}
        />
      </div>
    </div>
  );
};

export default Counter;
