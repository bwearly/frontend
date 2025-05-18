import { useState, useEffect } from 'react';
import type { PlayerBio } from '../types/PlayerBio';
import type { GameLog } from '../types/GameLog';
import type { GameAverages } from '../types/GameAverages';
import '../css/playerProfile.css';
import defaultImg from '../assets/default.png';

const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainder = inches % 12;
  return `${feet}'${remainder}"`;
};

const safeDisplay = (val: number | null | undefined) =>
  val !== null && val !== undefined ? val : '-';

interface PlayerProfileProps {
  player: PlayerBio;
  gameLogs: GameLog[];
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

      <h3 className="section-title">Game Logs</h3>
      <table className="game-log-table">
        <thead>
          <tr>
            <th>Date</th>
            <th className="tool-tips" title="Time Played (Minutes)">
              MIN
            </th>
            <th className="tool-tips" title="Points">
              PTS
            </th>
            <th className="tool-tips" title="Field Goals Made">
              FGM
            </th>
            <th className="tool-tips" title="Field Goals Attempted">
              FGA
            </th>
            <th className="tool-tips" title="Field Goal Percentage">
              FG%
            </th>
            <th className="tool-tips" title="3 Point Made">
              3PM
            </th>
            <th className="tool-tips" title="3 Point Attempted">
              3PA
            </th>
            <th className="tool-tips" title="3 Point Percentage">
              3P%
            </th>
            <th className="tool-tips" title="Free Throw Made">
              FTM
            </th>
            <th className="tool-tips" title="Free Throw Attempts">
              FTA
            </th>
            <th className="tool-tips" title="Free Throw Percentage">
              FT%
            </th>
            <th className="tool-tips" title="Offensive Rebounds">
              OREB
            </th>
            <th className="tool-tips" title="Defensive Rebounds">
              DREB
            </th>
            <th className="tool-tips" title="Rebounds">
              REB
            </th>
            <th className="tool-tips" title="Assists">
              AST
            </th>
            <th className="tool-tips" title="Steals">
              STL
            </th>
            <th className="tool-tips" title="Blocks">
              BLK
            </th>
            <th className="tool-tips" title="Turn Over">
              TOV
            </th>
            <th className="tool-tips" title="Personal Foul">
              PF
            </th>
          </tr>
        </thead>
        <tbody>
          {gameLogs.map((log, idx) => (
            <tr key={idx}>
              <td>{new Date(log.date).toLocaleDateString()}</td>
              <td>{log.timePlayed.split(':')[0]}</td>
              <td>{log.pts}</td>
              <td>{log.fgm}</td>
              <td>{log.fga}</td>
              <td>{safeDisplay(log.fgPercent)}</td>
              <td>{log.tpm}</td>
              <td>{log.tpa}</td>
              <td>{safeDisplay(log.tpPercent)}</td>
              <td>{log.ftm}</td>
              <td>{log.fta}</td>
              <td>{safeDisplay(log.ftPercent)}</td>
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
              <td>{averages.fgPercent ?? '-'}</td>
              <td>{averages.tpm}</td>
              <td>{averages.tpa}</td>
              <td>{averages.tpPercent ?? '-'}</td>
              <td>{averages.ftm}</td>
              <td>{averages.fta}</td>
              <td>{averages.ftPercent ?? '-'}</td>
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
