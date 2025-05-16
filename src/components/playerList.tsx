import { useEffect, useState } from 'react';
import type { PlayerBio } from '../types/PlayerBio';
import playerData from '../api/PlayerData.json';
import PlayerCard from './playerCard';

function PlayerList({ onSelect }: { onSelect: (player: PlayerBio) => void }) {
  const [players, setPlayers] = useState<PlayerBio[]>([]);

  useEffect(() => {
    setPlayers(playerData.bio);
  }, []);

  return (
    <div className="player-grid">
      {players.map((player) => (
        <PlayerCard key={player.playerId} player={player} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default PlayerList;
