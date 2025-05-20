// --- playerProfile.tsx ---
import { useState, useEffect } from 'react';
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
  const percent = (made / attempts) * 100;
  return `${percent.toFixed(1)}%`;
};

interface PlayerProfileProps {
  player: PlayerBio;
  gameLogs: GameLog[]; // ✅ Already transformed
  averages: GameAverages | null;
  report: string | null;
  onClose: () => void;
}

function PlayerProfile({
  player,
  gameLogs,
  averages,
  report,
  onClose,
}: PlayerProfileProps) {
  const [editableReport, setEditableReport] = useState(report ?? '');
  const [isEditing, setIsEditing] = useState(false);
  const [showCombineData, setShowCombineData] = useState(false);

  const combineData = playerData.measurements?.find(
    (p: any) => p.playerId === player.playerId
  );

  useEffect(() => {
    setEditableReport(report ?? '');
  }, [report, player.playerId]);

  return (
    <div className="player-profile">
      <button className="close-button" onClick={onClose}>
        ✖
      </button>

      <div className="player-header">
        <img
          className="player-profile-img"
          src={player.photoUrl ?? defaultImg}
          alt={player.name}
        />
        <div className="player-info-block">
          <div className="player-name-section">
            <h2 className="player-name-profile">{player.name}</h2>
          </div>
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
              <strong>Hometown:</strong> {player.homeTown},{' '}
              {player.homeState ?? player.homeCountry}
            </p>
            <p>
              <strong>Nationality:</strong>{' '}
              {player.nationality === 'USA' ? 'American' : 'N/A'}
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
          <div className="label">Height (Shoes):</div>
          <div className="value">{combineData.heightShoes}"</div>
          <div className="label">Wingspan:</div>
          <div className="value">{combineData.wingspan}"</div>
          <div className="label">Reach:</div>
          <div className="value">{combineData.reach}"</div>
          <div className="label">Vertical (Max):</div>
          <div className="value">{combineData.maxVertical}"</div>
          <div className="label">Vertical (No Step):</div>
          <div className="value">{combineData.noStepVertical}"</div>
          <div className="label">Weight:</div>
          <div className="value">{combineData.weight} lbs</div>
          <div className="label">Hand Size:</div>
          <div className="value">
            {combineData.handLength}" x {combineData.handWidth}"
          </div>
          <div className="label">Agility:</div>
          <div className="value">
            {combineData.agility != null ? `${combineData.agility}s` : '--'}
          </div>
          <div className="label">Sprint:</div>
          <div className="value">
            {combineData.sprint != null ? `${combineData.sprint}s` : '--'}
          </div>
          <div className="label">Shuttle:</div>
          <div className="value">
            {combineData.shuttleBest != null
              ? `${combineData.shuttleBest}s`
              : '--'}
          </div>
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
            <th>OREB</th>
            <th>DREB</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TOV</th>
            <th>PF</th>
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
              <td>{log.oreb}</td>
              <td>{log.dreb}</td>
              <td>{log.reb}</td>
              <td>{log.ast}</td>
              <td>{log.stl}</td>
              <td>{log.blk}</td>
              <td>{log.tov}</td>
              <td>{log.pf}</td>
            </tr>
          ))}

          {averages && (
            <tr className="average-row">
              <td>
                <strong>AVG</strong>
              </td>
              <td>{averages.timePlayed.split(':')[0]}</td>
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
              <td>{averages.oreb}</td>
              <td>{averages.dreb}</td>
              <td>{averages.reb}</td>
              <td>{averages.ast}</td>
              <td>{averages.stl}</td>
              <td>{averages.blk}</td>
              <td>{averages.tov}</td>
              <td>{averages.pf}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 className="section-title">Scouting Report</h3>
      {isEditing ? (
        <>
          <textarea
            className="scouting-report"
            value={editableReport}
            onChange={(e) => setEditableReport(e.target.value)}
          />
          <button
            className="action-button"
            style={{ backgroundColor: 'green', color: 'white' }}
            onClick={() => setIsEditing(false)}
          >
            Save Report
          </button>
        </>
      ) : (
        <>
          <textarea
            className="scouting-report"
            value={editableReport || 'No scouting report available.'}
            readOnly
          />
          <button className="action-button" onClick={() => setIsEditing(true)}>
            Edit Report
          </button>
        </>
      )}
    </div>
  );
}

export default PlayerProfile;
