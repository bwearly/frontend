import { useState } from 'react';
import { Link } from 'react-router-dom';
import playerData from '../api/PlayerData.json';
import defaultImg from '../assets/default.png';
import '../css/playerCard.css';
import '../css/player.css';

const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainder = inches % 12;
  return `${feet}'${remainder}"`;
};

function Players() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = playerData.bio.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="main-content-with-bg">
        <div className="background-logo" />
        <h1 className="branding">All Players</h1>
        <input
          type="text"
          placeholder="Search players..."
          className="player-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="players-page">
          {filteredPlayers.length === 0 ? (
            <p className="no-results">No players found.</p>
          ) : (
            <div
              className={`player-grid ${searchTerm && filteredPlayers.length === 1 ? 'align-left' : ''}`}
            >
              {filteredPlayers.map((player) => (
                <Link
                  key={player.playerId}
                  to={`/player/${player.playerId}`}
                  className="large-player-card"
                >
                  <img
                    className="large-profile-picture-panel"
                    src={player.photoUrl ?? defaultImg}
                    alt={player.name}
                  />
                  <div className="large-player-info">
                    <h3 className="large-player-name-card">{player.name}</h3>
                    <p className="large-player-school">
                      {player.currentTeam ?? 'N/A'}
                    </p>
                    <p className="large-player-hometown">
                      {formatHeight(player.height)} | {player.weight} lbs
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Players;
