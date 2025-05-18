import type { PlayerBio } from '../types/PlayerBio';
import '../css/playerCard.css';
import defaultImg from '../assets/default.png';
import compareIcon from '../assets/compare.png';

function handleCompareClick(player: PlayerBio) {
  console.log('Compare triggered for:', player.name);
}

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
        <h3 className="player-name-card">{player.name}</h3>
        <p className="player-school">{player.currentTeam ?? 'N/A'}</p>
        <p>
          <strong>Height:</strong> {formatHeight(player.height)}
        </p>
        <p className="player-hometown">
          <strong>Hometown:</strong> {player.homeTown},{' '}
          {player.homeState ?? player.homeCountry}
        </p>
        <button
          className="compare-button"
          onClick={() => handleCompareClick(player)}
          title="Compare Player"
        >
          <img src={compareIcon} alt="Compare" className="compare-icon" />
        </button>
      </div>
    </div>
  );
}

export default PlayerCard;
