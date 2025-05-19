import { calculateAverages } from './calculateAverages';
import type { GameLog } from '../types/GameLog';
import type { PlayerAverages } from '../types/PlayerAverages';

function groupLogsByPlayer(
  allLogs: GameLog[],
  nameMap: Record<string, string>
): PlayerAverages[] {
  const playerMap: Record<string, GameLog[]> = {};

  allLogs.forEach((log) => {
    if (!playerMap[log.playerId]) {
      playerMap[log.playerId] = [];
    }
    playerMap[log.playerId].push(log);
  });

  return Object.entries(playerMap).map(([playerId, logs]) => ({
    playerId,
    name: nameMap[playerId] ?? 'Unknown',
    averages: calculateAverages(logs),
  }));
}

export default groupLogsByPlayer;
