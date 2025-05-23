import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddScoutingReport from '../components/addScoutingReport';
import type { PlayerBio } from '../types/PlayerBio';
import playerData from '../api/PlayerData.json';
import '../css/playerTable.css';
import '../css/scoutPanel.css';
import defaultImg from '../assets/default.png';
import { useScoutingReports } from '../utils/ScoutingReportContext';

const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainder = inches % 12;
  return `${feet}'${remainder}"`;
};

function ScoutReports() {
  const [modalOpen, setModalOpen] = useState(false);

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

  const { scoutingReports, addReport } = useScoutingReports();

  const playersWithReports: PlayerBio[] = playerData.bio.filter((player) =>
    scoutingReports.some((r) => r.playerId === player.playerId)
  );

  return (
    <div className="main-content-with-bg">
      <div className="background-logo" />
      <h1 className="branding">Scouting Reports</h1>

      {playersWithReports.map((player) => {
        const report = scoutingReports.find(
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
                <h3>
                  <Link
                    to={`/player/${player.playerId}`}
                    className="scouting-name"
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
      <AddScoutingReport
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        addReport={addReport}
      />
      <Fab
        aria-label="add"
        onClick={() => setModalOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: '#1d1f2b',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2c2f3e',
          },
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default ScoutReports;
