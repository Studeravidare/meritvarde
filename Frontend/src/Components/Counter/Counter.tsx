import React, { useState } from "react";
import InputCourses from "../InputCourses/InputCourses";
import SavedSubjects from "../SavedSubjects/SavedSubjects";
import EducationSuggestions from "../EducationSuggestions/EducationSuggestions";
import type { Course } from "../../types/merit";
import { calculateMeritValue } from "../MeritCalc/calculateMerit";
import "./counter.css";

const Counter: React.FC = () => {
  // useStates
  // Kurser
  const [courses, setCourses] = useState<Course[]>([]);
  // Meritvärde
  const [meritValue, setMeritValue] = useState<number | null>(null);
  // Utbildningsförslag
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

    // Funktion för uträkning
    const merit = calculateMeritValue(courses);
    // Spara merit
    setMeritValue(merit);

    // Töm tidigare förslag
    setEducationSuggestions([]);

    try {
      // Fetch (använder sig av proxy) vite.config.ts
      const res = await fetch(`/utbildningar?meritvärde=${merit.toFixed(2)}`);
      // Vid fel
      if (!res.ok) throw new Error("Misslyckades att hämta utbildningar");
      // Spara alla utbildningsförslag
      const allSuggestions = await res.json();

      // Beräkna range för utbildningsförslag
      // t.ex. meritvärde 14 → bara minMerit = 14
      const roundedMerit = Math.floor(merit / 2) * 2; // Hitta merit närmaste jämna tal nedåt
      // Filtrera utbildningsförslagen
      const filteredSuggestions = allSuggestions.filter(
        (utb: any) => utb.minMerit === roundedMerit
      );

      // Spara filtrerade förslag
      setEducationSuggestions(filteredSuggestions);
    } catch (err) {
      // Error catch
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
