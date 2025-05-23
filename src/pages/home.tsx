import { useState } from 'react';
import '../App.css';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import PlayerProfile from '../components/playerProfile';
import type { PlayerBio } from '../types/PlayerBio';
import playerData from '../api/PlayerData.json';
import type { GameLog } from '../types/GameLog';
import PlayerTable from '../components/playerTable';
import { transformRawLog } from '../utils/TransformGameLogs';
import { calculateAverages } from '../utils/calculateAverages';
import groupLogsByPlayer from '../utils/GroupLogsByPlayers';
import StatCard from '../components/statsCard';
import SalaryCard from '../components/salaryCard';
import ScoutPanel from '../components/scoutPanel';
import { useScoutingReports } from '../utils/ScoutingReportContext';
import AddScoutingReport from '../components/addScoutingReport';

function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerBio | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const allLogs: GameLog[] = playerData.game_logs.map(transformRawLog);

  const playerLogs = selectedPlayer
    ? allLogs.filter((log) => log.playerId === selectedPlayer.playerId)
    : [];

  const averages = playerLogs.length > 0 ? calculateAverages(playerLogs) : null;

  const grouped = groupLogsByPlayer(allLogs);

  const players = grouped.map((p) => ({
    playerId: p.playerId,
    name: p.name,
    team: p.team,
    averages: calculateAverages(p.logs),
  }));

  const { scoutingReports, addReport } = useScoutingReports();

  const playersWithReports = playerData.bio
    .filter((p) => scoutingReports.some((r) => r.playerId === p.playerId))
    .map((p) => ({
      playerId: p.playerId.toString(),
      name: `${p.firstName} ${p.lastName}`,
      team: p.currentTeam ?? 'N/A',
    }));

  return (
    <div className="main-content-with-bg">
      <div className="background-logo" />
      <div className="branding">
        <h1>Dallas Mavericks Draft Board</h1>
      </div>
      <div className="main-content-inner">
        <div className="main-content-wrapper">
          <div className="main-content-body">
            <div className="left-column">
              <PlayerTable onSelectPlayer={setSelectedPlayer} />
              {selectedPlayer && (
                <PlayerProfile
                  player={selectedPlayer}
                  gameLogs={playerLogs}
                  averages={averages}
                  onClose={() => setSelectedPlayer(null)}
                />
              )}

              <div className="stat-salary-wrapper">
                <StatCard players={players} />
                <SalaryCard />
              </div>
            </div>
          </div>
          <div className="scout-panel-container">
            <ScoutPanel playersWithReports={playersWithReports} />
          </div>
        </div>
      </div>
      <Fab
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#1d1f2b',
          border: 'none',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2c2f3e',
          },
        }}
        onClick={() => setModalOpen(true)}
      >
        <AddIcon />
      </Fab>
      <AddScoutingReport
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        addReport={addReport}
      />
    </div>
  );
}

export default Home;
