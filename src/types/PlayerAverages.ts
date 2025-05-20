import type { GameAverages } from './GameAverages';

export interface PlayerAverages {
  playerId: number;
  name: string;
  team?: string;
  averages: GameAverages;
}
