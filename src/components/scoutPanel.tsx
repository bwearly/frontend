import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/scoutPanel.css';

interface Player {
  playerId: string;
  name: string;
  team: string;
}

interface Props {
  playersWithReports: Player[];
}

export default function ScoutingPanel({ playersWithReports }: Props) {
  const [playerList, setPlayerList] = useState(playersWithReports);

  const [originalIndexes, setOriginalIndexes] = useState<
    Record<string, number>
  >({});
  const [moveDirection, setMoveDirection] = useState<
    Record<string, 'up' | 'down' | null>
  >({});

  useEffect(() => {
    const indexMap: Record<string, number> = {};
    playersWithReports.forEach((p, i) => {
      indexMap[p.playerId] = i;
    });
    setOriginalIndexes(indexMap);
  }, [playersWithReports]);

  const movePlayer = (index: number, direction: 'up' | 'down') => {
    const newList = [...playerList];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newList.length) return;

    // Swap players
    const movingPlayer = newList[index];
    const bumpedPlayer = newList[targetIndex];
    [newList[index], newList[targetIndex]] = [bumpedPlayer, movingPlayer];
    setPlayerList(newList);

    // Determine movement directions based on original indexes
    const getDir = (
      playerId: string,
      newIndex: number
    ): 'up' | 'down' | null => {
      const original = originalIndexes[playerId];
      if (original === undefined) return null;
      if (newIndex < original) return 'up';
      if (newIndex > original) return 'down';
      return null;
    };

    setMoveDirection((prev) => ({
      ...prev,
      [movingPlayer.playerId]: getDir(movingPlayer.playerId, targetIndex),
      [bumpedPlayer.playerId]: getDir(bumpedPlayer.playerId, index),
    }));
  };

  const getMoveOffset = (playerId: string, currentIndex: number) => {
    const originalIndex = originalIndexes[playerId];
    if (originalIndex === undefined) return null;

    const diff = Math.abs(originalIndex - currentIndex);
    return diff > 0 ? diff : null;
  };

  return (
    <div className="scouting-panel">
      <h2>Scouting Priority</h2>
      {playerList.map((player, index) => {
        const offset = getMoveOffset(player.playerId, index);
        return (
          <div className="scout-card" key={player.playerId}>
            <div className="scout-info">
              <strong>
                <Link
                  to={`/player/${player.playerId}`}
                  className="scouting-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  {player.name}
                </Link>
              </strong>
              <span>{player.team}</span>
            </div>
            <div className="scout-actions">
              <button
                className={`arrow-btn ${moveDirection[player.playerId] === 'up' ? 'green' : ''}`}
                onClick={() => movePlayer(index, 'up')}
              >
                ⬆
              </button>
              <button
                className={`arrow-btn ${moveDirection[player.playerId] === 'down' ? 'red' : ''}`}
                onClick={() => movePlayer(index, 'down')}
              >
                ⬇
              </button>
              {offset && <span className="move-count">{offset}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
