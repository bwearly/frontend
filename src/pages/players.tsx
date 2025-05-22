import { useState } from 'react';
import { Link } from 'react-router-dom';
import playerData from '../api/PlayerData.json';
import defaultImg from '../assets/default.png';
import '../css/playerCard.css';
import '../css/player.css';

import { Autocomplete, TextField } from '@mui/material';

const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainder = inches % 12;
  return `${feet}'${remainder}"`;
};

function Players() {
  const [searchTerm, setSearchTerm] = useState('');

  const playerNames = playerData.bio.map((player) => player.name);

  const filteredPlayers = playerData.bio.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="main-content-with-bg">
        <div className="background-logo" />
        <h1 className="branding">All Players</h1>

        <Autocomplete
          freeSolo
          options={playerNames}
          value={searchTerm}
          onChange={(_, newValue) => setSearchTerm(newValue ?? '')}
          onInputChange={(_, newInputValue) => setSearchTerm(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Players..."
              variant="standard"
              sx={{
                '& .MuiInputBase-root': {
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  width: '250px',
                  marginTop: '1rem',
                  backgroundColor: 'white',
                  color: 'gray',
                },
                '& .MuiInputBase-input': {
                  padding: 0,
                  color: 'gray',
                },
              }}
            />
          )}
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
