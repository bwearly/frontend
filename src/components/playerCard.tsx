import type { PlayerBio } from '../types/PlayerBio';
import defaultImg from '../assets/default.png';
import '../css/playerCard.css';

interface PlayerCardProps {
  player: PlayerBio;
  onSelect: (player: PlayerBio) => void;
}

function PlayerCard({ player, onSelect }: PlayerCardProps) {
  return (
    <div
      className="player-card"
      onClick={() => onSelect(player)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', String(player.playerId));
      }}
    >
      <img
        className="profile-picture-panel"
        src={player.photoUrl ?? defaultImg}
        alt={player.name}
      />
      <div className="player-info">
        <h3 className="player-name">{player.name}</h3>
        <p className="player-team">{player.currentTeam ?? 'N/A'}</p>
      </div>
    </div>
  );
}

export default PlayerCard;
