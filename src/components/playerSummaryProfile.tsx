import { useState } from 'react';
import type { PlayerBio } from '../types/PlayerBio';
import type { GameLog } from '../types/GameLog';
import type { GameAverages } from '../types/GameAverages';
import '../css/playerProfile.css';
import defaultImg from '../assets/default.png';
import playerData from '../api/PlayerData.json';

const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainder = inches % 12;
  return `${feet}'${remainder}"`;
};

const formatPercent = (made: number, attempts: number) => {
  if (attempts === 0) return '-';
  return `${((made / attempts) * 100).toFixed(1)}%`;
};

interface Props {
  player: PlayerBio;
  gameLogs: GameLog[];
  averages: GameAverages | null;
}

function PlayerSummaryProfile({ player, gameLogs, averages }: Props) {
  const [showCombineData, setShowCombineData] = useState(false);

  const combineData = playerData.measurements?.find(
    (p: any) => p.playerId === player.playerId
  );

  return (
    <div className="player-summary-profile player-summary">
      <div className="player-summary-header">
        <img
          className="player-profile-img"
          src={player.photoUrl ?? defaultImg}
          alt={player.name}
        />
        <div className="player-info-block">
          <h2 className="player-name-profile">{player.name}</h2>
          <div className="player-details">
            <p>
              <strong>Team:</strong> {player.currentTeam ?? 'N/A'}
            </p>
            <p>
              <strong>League:</strong> {player.league ?? 'N/A'}
            </p>
            <p>
              <strong>Height:</strong> {formatHeight(player.height)}
            </p>
            <p>
              <strong>Weight:</strong> {player.weight} lbs
            </p>
            <p>
              <strong>Hometown:</strong> {player.homeTown},
              {player.homeState ?? player.homeCountry}
            </p>
            <p>
              <strong>Birth Date:</strong>{' '}
              {player.birthDate
                ? new Date(player.birthDate).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <button
        className="toggle-button"
        onClick={() => setShowCombineData(!showCombineData)}
      >
        {showCombineData
          ? 'Hide Combine Measurements'
          : 'Show Combine Measurements'}
      </button>

      {showCombineData && combineData && (
        <div className="combine-section-grid">
          <div className="label">Height (No Shoes):</div>
          <div className="value">{combineData.heightNoShoes}"</div>
          <div className="label">Wingspan:</div>
          <div className="value">{combineData.wingspan}"</div>
          <div className="label">Reach:</div>
          <div className="value">{combineData.reach}"</div>
          <div className="label">Vertical (Max):</div>
          <div className="value">{combineData.maxVertical}"</div>
          <div className="label">Weight:</div>
          <div className="value">{combineData.weight} lbs</div>
        </div>
      )}

      <h3 className="section-title">Game Logs</h3>
      <table className="game-log-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>MIN</th>
            <th>PTS</th>
            <th>FGM</th>
            <th>FGA</th>
            <th>FG%</th>
            <th>3PM</th>
            <th>3PA</th>
            <th>3P%</th>
            <th>FTM</th>
            <th>FTA</th>
            <th>FT%</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
          </tr>
        </thead>
        <tbody>
          {gameLogs.map((log, idx) => (
            <tr key={idx}>
              <td>
                {log.date
                  ? new Date(log.date).toLocaleDateString()
                  : `Game ${idx + 1}`}
              </td>
              <td>{log.timePlayed?.split(':')[0]}</td>
              <td>{log.pts}</td>
              <td>{log.fgm}</td>
              <td>{log.fga}</td>
              <td>{formatPercent(log.fgm, log.fga)}</td>
              <td>{log.tpm}</td>
              <td>{log.tpa}</td>
              <td>{formatPercent(log.tpm, log.tpa)}</td>
              <td>{log.ftm}</td>
              <td>{log.fta}</td>
              <td>{formatPercent(log.ftm, log.fta)}</td>
              <td>{log.reb}</td>
              <td>{log.ast}</td>
              <td>{log.stl}</td>
              <td>{log.blk}</td>
            </tr>
          ))}

          {averages && (
            <tr className="average-row">
              <td>
                <strong>AVG</strong>
              </td>
              <td>{averages.timePlayed?.split(':')[0]}</td>
              <td>{averages.pts}</td>
              <td>{averages.fgm}</td>
              <td>{averages.fga}</td>
              <td>
                {averages.fgPercent != null ? `${averages.fgPercent}%` : '-'}
              </td>
              <td>{averages.tpm}</td>
              <td>{averages.tpa}</td>
              <td>
                {averages.tpPercent != null ? `${averages.tpPercent}%` : '-'}
              </td>
              <td>{averages.ftm}</td>
              <td>{averages.fta}</td>
              <td>
                {averages.ftPercent != null ? `${averages.ftPercent}%` : '-'}
              </td>
              <td>{averages.reb}</td>
              <td>{averages.ast}</td>
              <td>{averages.stl}</td>
              <td>{averages.blk}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerSummaryProfile;
