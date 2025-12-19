export type Grade = "A" | "B" | "C" | "D" | "E" | "F";

export interface Course {
  id: number;
  name: string;
  points: number;       // gymnasiepoäng
  grade: Grade;
  isExtended: boolean;  // utökad kurs
  meritPoints: number;  // 0–1.5
}
