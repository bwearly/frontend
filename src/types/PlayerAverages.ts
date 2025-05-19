import type { GameAverages } from './GameAverages';

export interface PlayerAverages {
  playerId: string;
  name: string;
  team?: string;
  averages: GameAverages;
}
