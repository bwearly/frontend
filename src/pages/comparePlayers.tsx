import { useState } from 'react';
import PlayerPanel from '../components/playerPanel';
import type { PlayerBio } from '../types/PlayerBio';
import playerData from '../api/PlayerData.json';
import '../css/comparePlayer.css';
import PlayerSummaryProfile from '../components/playerSummaryProfile';
import { transformRawLog } from '../utils/TransformGameLogs';
import { calculateAverages } from '../utils/calculateAverages';

function ComparePlayers() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [player1, setPlayer1] = useState<PlayerBio | null>(null);
  const [player2, setPlayer2] = useState<PlayerBio | null>(null);

  const allLogs = playerData.game_logs.map(transformRawLog);

  const player1Logs = player1
    ? allLogs.filter((log) => log.playerId === player1.playerId)
    : [];
  const player2Logs = player2
    ? allLogs.filter((log) => log.playerId === player2.playerId)
    : [];

  const averages1 = player1Logs.length ? calculateAverages(player1Logs) : null;
  const averages2 = player2Logs.length ? calculateAverages(player2Logs) : null;

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

  const handleSelect = (player: PlayerBio) => {
    if (!player1) {
      setPlayer1(player);
      if (player2) setIsPanelOpen(false);
    } else if (!player2) {
      setPlayer2(player);
      if (player1) setIsPanelOpen(false);
    } else {
      const confirmReplace = window.confirm(
        'Both slots are full. Replace Player 1 with new selection?'
      );
      if (confirmReplace) {
        setPlayer1(player);
        setPlayer2(null);
      }
    }
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
            onSelectPlayer={handleSelect}
          />

          <div className="drop-zones">
            <div
              className="drop-zone"
              onDrop={(e) => handleDrop(e, 'player1')}
              onDragOver={allowDrop}
            >
              {player1 ? (
                <div className="drop-wrapper">
                  <button
                    className="close-button"
                    onClick={() => setPlayer1(null)}
                  >
                    ✖
                  </button>
                  <PlayerSummaryProfile
                    player={player1}
                    averages={averages1}
                    compareAverages={averages2}
                  />
                </div>
              ) : (
                <p>Click or Drag Player 1 Here</p>
              )}
            </div>

            <div
              className="drop-zone"
              onDrop={(e) => handleDrop(e, 'player2')}
              onDragOver={allowDrop}
            >
              {player2 ? (
                <div className="drop-wrapper">
                  <button
                    className="close-button"
                    onClick={() => setPlayer2(null)}
                  >
                    ✖
                  </button>
                  <PlayerSummaryProfile
                    player={player2}
                    averages={averages2}
                    compareAverages={averages1}
                  />
                </div>
              ) : (
                <p>Click or Drag Player 2 Here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparePlayers;
