import type { PlayerBio } from '../types/PlayerBio';
import '../css/playerCard.css';
import defaultImg from '../assets/default.png';

interface PlayerCardProps {
  player: PlayerBio;
  onSelect: (player: PlayerBio) => void;
}

function PlayerCard({ player, onSelect }: PlayerCardProps) {
  const formatHeight = (inches: number) => {
    const feet = Math.floor(inches / 12);
    const remainder = inches % 12;
    return `${feet}'${remainder}"`;
  };

  return (
    <div className="player-card" onClick={() => onSelect(player)}>
      <img
        className="profile-picture-panel"
        src={player.photoUrl ?? defaultImg}
        alt={player.name}
      />
      <div className="player-info">
        <h3 className="player-name">{player.name}</h3>
        <p className="player-school">{player.currentTeam ?? 'N/A'}</p>
        <p><strong>Height:</strong> {formatHeight(player.height)}</p>
        <p className="player-hometown">
          <strong>Hometown:</strong> {player.homeTown},{' '}
          {player.homeState ?? player.homeCountry}
        </p>
      </div>
    </div>
  );
}

export default PlayerCard;
