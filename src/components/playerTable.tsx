import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { PlayerBio } from '../types/PlayerBio';
import playerData from '../api/PlayerData.json';
import '../css/playerTable.css';
import defaultImg from '../assets/default.png';

interface PlayerTableProps {
  onSelectPlayer: (player: PlayerBio) => void;
}

const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainder = inches % 12;
  return `${feet}'${remainder}"`;
};

function PlayerTable({ }: PlayerTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleExpand = (playerId: string) => {
    setExpandedRow((prev) => (prev === playerId ? null : playerId));
  };

  const players = playerData.bio;

  return (
    <div className={`player-table-card ${expandedRow ? 'expanded' : ''}`}>
      <h2 className="table-title">Draft Prospects</h2>
      <table className="player-table">
        <thead>
          <tr>
            <th>RK</th>
            <th>Player</th>
            <th>School</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => {
            const id = player.playerId.toString();

            return (
              <>
                <tr
                  key={id}
                  onClick={() => toggleExpand(id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <Link
                      to={`/player/${player.playerId}`}
                      className="scouting-name"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {player.name}
                    </Link>
                  </td>
                  <td>{player.currentTeam ?? 'N/A'}</td>
                </tr>

                {expandedRow === id && (
                  <tr key={id + '-details'} className="player-details-row">
                    <td colSpan={3}>
                      <div className="scouting-card">
                        <div className="scouting-left">
                          <img
                            src={player.photoUrl ?? defaultImg}
                            alt={player.name}
                            className="scouting-img"
                          />
                          <div className="scouting-basic-info">
                            <h3 onClick={(e) => e.stopPropagation()}>
                              <Link
                                to={`/player/${player.playerId}`}
                                className="scouting-name"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {player.name}
                              </Link>
                            </h3>
                            <p>{formatHeight(player.height)} | {player.weight} lbs</p>
                            <p>{player.currentTeam}</p>
                          </div>
                        </div>
                        <div className="scouting-right">
                          <h4>Pre-Draft Analysis</h4>
                          <p className="scouting-summary">
                            {playerData.scoutingReports.find(
                              (r) => r.playerId === player.playerId
                            )?.report ?? 'No scouting report available.'}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerTable;
