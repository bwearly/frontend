import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import type { PlayerBio } from '../types/PlayerBio';
import playerData from '../api/PlayerData.json';
import '../css/playerTable.css';
import '../css/scoutPanel.css';
import defaultImg from '../assets/default.png';

const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainder = inches % 12;
  return `${feet}'${remainder}"`;
};

function ScoutReports() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlight-scroll');
          setTimeout(() => element.classList.remove('highlight-scroll'), 1500);
        }
      }, 100);
    }
  }, []);
  const playersWithReports: PlayerBio[] = playerData.bio.filter((player) =>
    playerData.scoutingReports.some((r) => r.playerId === player.playerId)
  );

  return (
    <div>
      <h1>Scout Reports</h1>
      {playersWithReports.map((player) => {
        const report = playerData.scoutingReports.find(
          (r) => r.playerId === player.playerId
        );

        return (
          <div
            className="scouting-report-card"
            key={player.playerId}
            id={`player-${player.playerId}`}
          >
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
                <p>
                  {formatHeight(player.height)} | {player.weight} lbs
                </p>
                <p>{player.currentTeam}</p>
              </div>
            </div>
            <div className="scouting-right">
              <h4>Pre-Draft Analysis {report?.scout && `- ${report.scout}`}</h4>
              <p className="scouting-summary">
                {report?.report ?? 'No scouting report available.'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ScoutReports;
