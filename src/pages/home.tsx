import { useState } from 'react';
import '../App.css';
import PlayerPanel from '../components/playerPanel';
import PlayerProfile from '../components/playerProfile';
import type { PlayerBio } from '../types/PlayerBio';
import playerData from '../api/PlayerData.json';
import { calculateAverages } from '../utils/calculateAverages';
import type { GameLog } from '../types/GameLog';

function Home() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerBio | null>(null);

  const gameLogs: GameLog[] = selectedPlayer
    ? playerData.game_logs
        .filter((log) => log.playerId === selectedPlayer.playerId)
        .map((log) => log as GameLog)
    : [];

  const averages = gameLogs.length > 0 ? calculateAverages(gameLogs) : null;

  return (
    <div className="app-container">
      <PlayerPanel
        isOpen={isPanelOpen}
        toggleOpen={() => setIsPanelOpen((prev) => !prev)}
        onSelectPlayer={setSelectedPlayer}
      />

      <main className={`main-content ${isPanelOpen ? 'shift-left' : ''}`}>
        {selectedPlayer ? (
          <PlayerProfile
            player={selectedPlayer}
            gameLogs={gameLogs}
            averages={averages}
            onClose={() => setSelectedPlayer(null)}
          />
        ) : (
          <div className="branding">
            <h1>Dallas Maverick Draft Board</h1>
            <img
              src="/dallas_mavericks.png"
              alt="Mavs Logo"
              className="main-logo"
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
