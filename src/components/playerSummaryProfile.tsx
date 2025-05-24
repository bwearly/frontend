import { useState, useEffect } from 'react';
import type { PlayerBio } from '../types/PlayerBio';
import type { GameAverages } from '../types/GameAverages';
import '../css/playerProfile.css';
import defaultImg from '../assets/default.png';
import playerData from '../api/PlayerData.json';
import { Tooltip } from '@mui/material';

const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainder = inches % 12;
  return `${feet}'${remainder}"`;
};

const highlight = (
  val: number | null | undefined,
  other: number | null | undefined
) => {
  if (val == null || other == null) return '';
  return val > other ? 'highlight-green' : '';
};

interface Props {
  player: PlayerBio;
  averages: GameAverages | null;
  compareAverages?: GameAverages | null;
  onClose?: () => void;
}

function PlayerSummaryProfile({
  player,
  averages,
  compareAverages,
  onClose,
}: Props) {
  const [editableReport, setEditableReport] = useState('');

  const combineData = playerData.measurements?.find(
    (p: any) => p.playerId === player.playerId
  );

  useEffect(() => {
    const report = playerData.scoutingReports.find(
      (r) => r.playerId === player.playerId
    );
    setEditableReport(report?.report ?? '');
  }, [player.playerId]);

  return (
    <div className="player-summary-profile" style={{ overflow: 'hidden' }}>
      {onClose && (
        <button
          className="close-button profile-summary-close"
          onClick={onClose}
        >
          ✖
        </button>
      )}

      <div className="player-summary-header">
        <img
          className="player-summary-img"
          src={player.photoUrl ?? defaultImg}
          alt={player.name}
        />
        <div className="player-summary-info-block">
          <h2 className="player-summary-name">{player.name}</h2>
          <div className="player-summary-columns">
            <div className="player-summary-col">
              <p>
                <strong>Team:</strong> {player.currentTeam ?? 'N/A'}
              </p>
              <p>
                <strong>Height:</strong> {formatHeight(player.height)}
              </p>
              <p>
                <strong>Hometown:</strong> {player.homeTown},{' '}
                {player.homeState ?? player.homeCountry}
              </p>
            </div>
            <div className="player-summary-col">
              <p>
                <strong>League:</strong> {player.league ?? 'N/A'}
              </p>
              <p>
                <strong>Weight:</strong> {player.weight} lbs
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
      </div>

      {combineData && (
        <div className="combine-summary-columns">
          <div className="combine-summary-col">
            <div className="row">
              <span className="label">Height (No Shoes):</span>{' '}
              {combineData.heightNoShoes}"
            </div>
            <div className="row">
              <span className="label">Height (Shoes):</span>{' '}
              {combineData.heightShoes}"
            </div>
            <div className="row">
              <span className="label">Wingspan:</span> {combineData.wingspan}"
            </div>
            <div className="row">
              <span className="label">Reach:</span> {combineData.reach}"
            </div>
            <div className="row">
              <span className="label">Vertical (Max):</span>{' '}
              {combineData.maxVertical}"
            </div>
            <div className="row">
              <span className="label">Vertical (No Step):</span>{' '}
              {combineData.noStepVertical}"
            </div>
          </div>

          <div className="combine-summary-col">
            <div className="row">
              <span className="label">Weight:</span> {combineData.weight} lbs
            </div>
            <div className="row">
              <span className="label">Hand Size:</span> {combineData.handLength}
              " x {combineData.handWidth}"
            </div>
            <div className="row">
              <span className="label">Agility:</span>{' '}
              {combineData.agility ?? '--'}s
            </div>
            <div className="row">
              <span className="label">Sprint:</span>{' '}
              {combineData.sprint ?? '--'}s
            </div>
            <div className="row">
              <span className="label">Shuttle:</span>{' '}
              {combineData.shuttleBest ?? '--'}s
            </div>
          </div>
        </div>
      )}

      <h3 className="section-title">Averages</h3>
      {averages && (
        <div className="averages-summary-wrapper">
          <table className="averages-summary-table">
            <thead>
              <tr className="averages-summery-row">
                <th>
                  <Tooltip title="Minutes Played" arrow>
                    <span>MIN</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Points Per Game" arrow>
                    <span>PTS</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Field Goals Made" arrow>
                    <span>FGM</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Field Goals Attempted" arrow>
                    <span>FGA</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Field Goal Percentage" arrow>
                    <span>FG%</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Three-Point Makes" arrow>
                    <span>3PM</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Three-Point Attempts" arrow>
                    <span>3PA</span>
                  </Tooltip>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{averages.timePlayed.split(':')[0]}</td>
                <td className={highlight(averages.pts, compareAverages?.pts)}>
                  {averages.pts}
                </td>
                <td>{averages.fgm}</td>
                <td>{averages.fga}</td>
                <td
                  className={highlight(
                    averages.fgPercent,
                    compareAverages?.fgPercent
                  )}
                >
                  {averages.fgPercent != null ? `${averages.fgPercent}%` : '-'}
                </td>
                <td>{averages.tpm}</td>
                <td>{averages.tpa}</td>
              </tr>
            </tbody>
          </table>

          <table className="averages-summary-table">
            <thead>
              <tr className="averages-summery-row">
                <th>
                  <Tooltip title="Three-Point Percentage" arrow>
                    <span>3P%</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Free Throws Made" arrow>
                    <span>FTM</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Free Throws Attempted" arrow>
                    <span>FTA</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Free Throw Percentage" arrow>
                    <span>FT%</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Rebound" arrow>
                    <span>REB</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Assist" arrow>
                    <span>AST</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Steal" arrow>
                    <span>STL</span>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title="Block" arrow>
                    <span>BLK</span>
                  </Tooltip>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  className={highlight(
                    averages.tpPercent,
                    compareAverages?.tpPercent
                  )}
                >
                  {averages.tpPercent != null ? `${averages.tpPercent}%` : '-'}
                </td>
                <td>{averages.ftm}</td>
                <td>{averages.fta}</td>
                <td
                  className={highlight(
                    averages.ftPercent,
                    compareAverages?.ftPercent
                  )}
                >
                  {averages.ftPercent != null ? `${averages.ftPercent}%` : '-'}
                </td>
                <td className={highlight(averages.reb, compareAverages?.reb)}>
                  {averages.reb}
                </td>
                <td className={highlight(averages.ast, compareAverages?.ast)}>
                  {averages.ast}
                </td>
                <td className={highlight(averages.stl, compareAverages?.stl)}>
                  {averages.stl}
                </td>
                <td className={highlight(averages.blk, compareAverages?.blk)}>
                  {averages.blk}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <h3 className="section-title">Scouting Report</h3>
      <textarea
        className="scouting-report-summary"
        value={editableReport || 'No scouting report available.'}
        readOnly
      />
    </div>
  );
}

export default PlayerSummaryProfile;
