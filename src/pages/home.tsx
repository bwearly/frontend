import { useState } from 'react';
import '../App.css';
import PlayerProfile from '../components/playerProfile';
import type { PlayerBio } from '../types/PlayerBio';
import playerData from '../api/PlayerData.json';
import { calculateAverages } from '../utils/calculateAverages';
import type { GameLog } from '../types/GameLog';
import PlayerTable from '../components/playerTable';

function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerBio | null>(null);

  const rawLogs = playerData.game_logs.filter(
    (log) => log.playerId === selectedPlayer?.playerId
  );

  const gameLogs: GameLog[] = rawLogs.map((log: any) => ({
    ...log,
    fgPercent: log['FG%'],
    tpPercent: log['3P%'],
    ftPercent: log['FTP'],
  }));

  const report = selectedPlayer
    ? playerData.scoutingReports.find(
        (r) => r.playerId === selectedPlayer.playerId
      )
    : null;

  const averages = gameLogs.length > 0 ? calculateAverages(gameLogs) : null;

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
                gameLogs={gameLogs}
                averages={averages}
                report={report?.report ?? null}
                onClose={() => setSelectedPlayer(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
