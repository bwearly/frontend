import { useState } from 'react';
import { Link } from 'react-router-dom';
import playerData from '../api/PlayerData.json';
import defaultImg from '../assets/default.png';
import '../css/playerCard.css';
import '../css/player.css';

function Players() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = playerData.bio.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="players-title">All Players</h1>
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
                className="player-card"
              >
                <img
                  className="profile-picture-panel"
                  src={player.photoUrl ?? defaultImg}
                  alt={player.name}
                />
                <div className="player-info">
                  <h3 className="player-name-card">{player.name}</h3>
                  <p className="player-school">{player.currentTeam ?? 'N/A'}</p>
                  <p className="player-hometown">
                    {player.homeTown}, {player.homeState ?? player.homeCountry}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Players;
