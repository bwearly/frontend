import { useState } from 'react';
import '../App.css';
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

function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerBio | null>(null);

  const allLogs: GameLog[] = playerData.game_logs.map(transformRawLog);

  const playerLogs = selectedPlayer
    ? allLogs.filter((log) => log.playerId === selectedPlayer.playerId)
    : [];

  const report = selectedPlayer
    ? playerData.scoutingReports.find(
        (r) => r.playerId === selectedPlayer.playerId
      )
    : null;

  const averages = playerLogs.length > 0 ? calculateAverages(playerLogs) : null;

  const rawLogs = playerData.game_logs.map(transformRawLog);

  const grouped = groupLogsByPlayer(rawLogs);

  const players = grouped.map((p) => ({
    playerId: p.playerId,
    name: p.name,
    team: p.team,
    averages: calculateAverages(p.logs),
  }));

  return (
    <div className="app-container">
      <div className="main-area">
        <div className="main-content-with-bg">
          <div className="background-logo" />
          <div className="main-content-inner">
            <div className="branding">
              <h1>Dallas Mavericks Draft Board</h1>
            </div>
            <PlayerTable onSelectPlayer={setSelectedPlayer} />
            {selectedPlayer && (
              <PlayerProfile
                player={selectedPlayer}
                gameLogs={playerLogs}
                averages={averages}
                report={report?.report ?? null}
                onClose={() => setSelectedPlayer(null)}
              />
            )}
            <div className="stat-salary-wrapper">
              <StatCard players={players} />
              <SalaryCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
