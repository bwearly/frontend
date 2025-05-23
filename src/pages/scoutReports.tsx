import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Fab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
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
  const { scoutingReports, addReport } = useScoutingReports();
  const [playerList, setPlayerList] = useState<PlayerBio[]>([]);
  const [originalIndexes, setOriginalIndexes] = useState<
    Record<string, number>
  >({});
  const [moveDirection, setMoveDirection] = useState<
    Record<string, 'up' | 'down' | null>
  >({});

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

  useEffect(() => {
    const players = playerData.bio.filter((player) =>
      scoutingReports.some((r) => r.playerId === player.playerId)
    );
    setPlayerList(players);

    const indexMap: Record<string, number> = {};
    players.forEach((p, i) => {
      indexMap[p.playerId.toString()] = i;
    });
    setOriginalIndexes(indexMap);
  }, [scoutingReports]);

  const movePlayer = (index: number, direction: 'up' | 'down') => {
    const newList = [...playerList];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newList.length) return;

    const movingPlayer = newList[index];
    const bumpedPlayer = newList[targetIndex];
    [newList[index], newList[targetIndex]] = [bumpedPlayer, movingPlayer];
    setPlayerList(newList);

    const getDir = (
      playerId: number,
      newIndex: number
    ): 'up' | 'down' | null => {
      const original = originalIndexes[playerId.toString()];
      if (original === undefined) return null;
      if (newIndex < original) return 'up';
      if (newIndex > original) return 'down';
      return null;
    };

    setMoveDirection((prev) => ({
      ...prev,
      [movingPlayer.playerId.toString()]: getDir(
        movingPlayer.playerId,
        targetIndex
      ),
      [bumpedPlayer.playerId.toString()]: getDir(bumpedPlayer.playerId, index),
    }));
  };

  const getMoveOffset = (playerId: number, currentIndex: number) => {
    const originalIndex = originalIndexes[playerId.toString()];
    if (originalIndex === undefined) return null;
    const diff = Math.abs(originalIndex - currentIndex);
    return diff > 0 ? diff : null;
  };

  return (
    <div className="main-content-with-bg">
      <div className="background-logo" />
      <h1 className="branding">Scouting Reports</h1>

      {playerList.map((player, index) => {
        const report = scoutingReports.find(
          (r) => r.playerId === player.playerId
        );
        const offset = getMoveOffset(player.playerId, index);

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
                <div className="scout-actions">
                  <IconButton
                    onClick={() => movePlayer(index, 'up')}
                    style={{
                      color:
                        moveDirection[player.playerId.toString()] === 'up'
                          ? 'green'
                          : '#aaa',
                    }}
                  >
                    <ArrowUpward />
                  </IconButton>
                  <IconButton
                    onClick={() => movePlayer(index, 'down')}
                    style={{
                      color:
                        moveDirection[player.playerId.toString()] === 'down'
                          ? 'red'
                          : '#aaa',
                    }}
                  >
                    <ArrowDownward />
                  </IconButton>
                  {offset && <span className="move-count">{offset}</span>}
                </div>
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
