import React, { useEffect, useState } from "react";
import InputCourses from "../InputCourses/InputCourses";
import SavedSubjects from "../SavedSubjects/SavedSubjects";
import EducationSuggestions from "../EducationSuggestions/EducationSuggestions";
import type { Course } from "../../types/merit";
import { calculateMeritValue } from "../MeritCalc/calculateMerit";
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

    // Ta fram nya merit
    const merit = calculateMeritValue(courses);
    // Spara merit
    setMeritValue(merit);

    // Fetch för utbildningar
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/utbildningar?meritvärde=${merit.toFixed(2)}`);
        // Vid fel
        if (!res.ok) throw new Error("Fetch failed");

        const all = await res.json();

        // Ta fram range
        const range = Math.min(20, Math.floor(merit / 2) * 2);
        // Ta fram filtrerad
        const filtered = all.filter((u: any) => u.minMerit === range);
        // Spara
        setEducationSuggestions(filtered);
      } catch (err) {
        // Vid error, ge error i konsol och töm förslag
        console.error(err);
        setEducationSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [courses]); // Runs when courses changes

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
        />
      </div>
    </div>
  );
};

export default Counter;
