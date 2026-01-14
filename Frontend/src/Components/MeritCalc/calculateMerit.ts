import type { Course } from "../../types/merit";

// Poängvärde för betyg
const GRADE_TO_POINTS = {
  A: 20,
  B: 17.5,
  C: 15,
  D: 12.5,
  E: 10,
  F: 0,
};

// Max meritvärde och meritpoäng
const MAX_MERIT_POINTS = 2.5;
const MAX_TOTAL = 22.5;

export const calculateMeritValue = (courses: Course[]): number => {
  // Variabler
  let weightedSum = 0;
  let totalPoints = 0;
  let meritExtra = 0;


  
  courses.forEach((c) => {
    // Spara värdet för betyg beroende på poäng
    weightedSum += GRADE_TO_POINTS[c.grade] * c.points;
    // Totala poäng
    totalPoints += c.points;
    // Eventuella meritpoäng
    meritExtra += c.meritPoints;
  });

  // Kollar så det inte är tomt
  if (totalPoints === 0) return 0;

  // Ta ut meritvärde (utan poäng)
  const average = weightedSum / totalPoints;
  // Ta ut meritpoäng, kan inte gå över 2.5
  const cappedMerit = Math.min(meritExtra, MAX_MERIT_POINTS);
  // Return meritvärdet med meritpoäng (högst 22.5)
  return Math.min(average + cappedMerit, MAX_TOTAL);
};
