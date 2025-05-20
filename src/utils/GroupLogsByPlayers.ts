import type { GameLog } from '../types/GameLog';
import playerData from '../api/PlayerData.json';

export default function groupLogsByPlayer(logs: GameLog[]) {
  const nameMap: Record<number, { name: string; team: string }> = {};
  for (const bio of playerData.bio) {
    nameMap[bio.playerId] = {
      name: bio.name,
      team: bio.currentTeam ?? '',
    };
  }

  const players: {
    playerId: number;
    name: string;
    team: string;
    logs: GameLog[];
  }[] = [];

  const grouped = logs.reduce(
    (acc, log) => {
      if (!acc[log.playerId]) {
        acc[log.playerId] = [];
      }
      acc[log.playerId].push(log);
      return acc;
    },
    {} as Record<number, GameLog[]>
  );

  for (const playerId in grouped) {
    const id = parseInt(playerId, 10);
    players.push({
      playerId: id,
      name: nameMap[id]?.name ?? 'Unknown',
      team: nameMap[id]?.team ?? '',
      logs: grouped[id],
    });
  }

  return players;
}
