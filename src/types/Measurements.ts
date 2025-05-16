export interface Measurement {
  playerId: number;
  heightNoShoes: number;
  heightShoes: number;
  wingspan: number;
  reach: number;
  maxVertical: number;
  noStepVertical: number;
  weight: number;
  bodyFat: number | null;
  handLength: number;
  handWidth: number;
  agility: number;
  sprint: number;
  shuttleLeft: number | null;
  shuttleRight: number | null;
  shuttleBest: number;
}
