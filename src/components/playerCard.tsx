import type { PlayerBio } from '../types/PlayerBio';
import defaultImg from '../assets/default.png';
import '../css/playerCard.css';

const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainder = inches % 12;
  return `${feet}'${remainder}"`;
};

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
        className="large-profile-picture-panel"
        src={player.photoUrl ?? defaultImg}
        alt={player.name}
      />
      <div className="large-player-info">
        <h3 className="player-name">{player.name}</h3>
        <p className="player-team">{player.currentTeam ?? 'N/A'}</p>
        <p className="large-player-hometown">
          {formatHeight(player.height)} | {player.weight} lbs
        </p>
      </div>
    </div>
  );
}

export default PlayerCard;
