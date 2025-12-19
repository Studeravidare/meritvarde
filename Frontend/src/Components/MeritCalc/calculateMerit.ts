import type { Course } from "../../types/merit";

/* CONSTANT */
const GRADE_TO_POINTS: Record<string, number> = {
  A: 20,
  B: 17.5,
  C: 15,
  D: 12.5,
  E: 10,
  F: 0,
};

const MAX_MERIT_POINTS = 2.5;
const MAX_TOTAL = 22.5;
const MAX_POINTS = 2500;

// Funktion för beräkning
export const calculateMeritValue = (courses: Course[]): number => {
  if (!courses.length) return 0;

  // Endast icke-utökade kurser påverkar jämförelsetalet
  const regularCourses = courses.filter((c) => !c.isExtended);

  // Sortera kurser efter jämförelsetal per poäng (högt först)
  const sorted = regularCourses.sort(
    (a, b) =>
      (GRADE_TO_POINTS[b.grade] || 0) - (GRADE_TO_POINTS[a.grade] || 0)
  );

  // Temporära värden
  let totalPoints = 0;
  let weightedSum = 0;

  // Beräkningen av merit för betygen
  for (const c of sorted) {
    if (totalPoints + c.points <= MAX_POINTS) {
      weightedSum += (GRADE_TO_POINTS[c.grade] || 0) * c.points;
      totalPoints += c.points;
    } else {
      // Om kursen överskrider 2500 p, ta bara kvarvarande poäng
      const remaining = MAX_POINTS - totalPoints;
      weightedSum += (GRADE_TO_POINTS[c.grade] || 0) * remaining;
      totalPoints += remaining;
      break;
    }
  }

  // Meritpoäng (max 2,5)
  const totalMerit = Math.min(
    courses.reduce((sum, c) => sum + c.meritPoints, 0),
    MAX_MERIT_POINTS
  );

  // Räkna ut meritvärde och cap på 22,5
  const comparison = totalPoints > 0 ? weightedSum / totalPoints : 0;
  return Math.min(comparison + totalMerit, MAX_TOTAL);
};
