import type { Course } from "../../types/merit";

const GRADE_TO_POINTS = {
  A: 20,
  B: 17.5,
  C: 15,
  D: 12.5,
  E: 10,
  F: 0,
};

const MAX_MERIT_POINTS = 2.5;
const MAX_TOTAL = 22.5;

export const calculateMeritValue = (courses: Course[]): number => {
  let weightedSum = 0;
  let totalPoints = 0;
  let meritExtra = 0;

  courses.forEach((c) => {
    if (!c.isExtended) {
      weightedSum += GRADE_TO_POINTS[c.grade] * c.points;
      totalPoints += c.points;
    }
    meritExtra += c.meritPoints;
  });

  if (totalPoints === 0) return 0;

  const average = weightedSum / totalPoints;
  const cappedMerit = Math.min(meritExtra, MAX_MERIT_POINTS);

  return Math.min(average + cappedMerit, MAX_TOTAL);
};
