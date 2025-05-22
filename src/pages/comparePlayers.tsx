import { useState } from 'react';
import PlayerPanel from '../components/playerPanel';
import type { PlayerBio } from '../types/PlayerBio';
import playerData from '../api/PlayerData.json';
import '../css/comparePlayer.css';
import PlayerSummaryProfile from '../components/playerSummaryProfile';

function ComparePlayers() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [player1, setPlayer1] = useState<PlayerBio | null>(null);
  const [player2, setPlayer2] = useState<PlayerBio | null>(null);

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    slot: 'player1' | 'player2'
  ) => {
    event.preventDefault();
    const playerId = event.dataTransfer.getData('text/plain');
    const player = playerData.bio.find((p) => p.playerId === Number(playerId));
    if (!player) return;

    if (slot === 'player1') setPlayer1(player);
    else setPlayer2(player);
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="main-content-with-bg">
      <div className="background-logo" />
      <h1 className="branding">Compare Players</h1>
      <div className="main-content-inner">
        <div className="compare-container">
          <PlayerPanel
            isOpen={isPanelOpen}
            toggleOpen={() => setIsPanelOpen((prev) => !prev)}
            onSelectPlayer={() => {}}
          />

          <div className="drop-zones">
            <div
              className="drop-zone"
              onDrop={(e) => handleDrop(e, 'player1')}
              onDragOver={allowDrop}
            >
              {player1 ? (
                <PlayerSummaryProfile
                  player={player1}
                  gameLogs={[]}
                  averages={null}
                />
              ) : (
                <p>Drag Player 1 Here</p>
              )}
            </div>

            <div
              className="drop-zone"
              onDrop={(e) => handleDrop(e, 'player2')}
              onDragOver={allowDrop}
            >
              {player2 ? (
                <PlayerSummaryProfile
                  player={player2}
                  gameLogs={[]}
                  averages={null}
                />
              ) : (
                <p>Drag Player 2 Here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparePlayers;
