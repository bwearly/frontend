import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import playerData from '../api/PlayerData.json';
import { calculateAverages } from '../utils/calculateAverages';
import PlayerProfile from '../components/playerProfile';
import type { PlayerBio } from '../types/PlayerBio';
import type { GameLog } from '../types/GameLog';

function PlayerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<PlayerBio | null>(null);

  useEffect(() => {
    const foundPlayer = playerData.bio.find(
      (p: PlayerBio) => p.playerId.toString() === id
    );
    if (!foundPlayer) {
      navigate('/'); // fallback if player not found
    } else {
      setPlayer(foundPlayer);
    }
  }, [id, navigate]);

  if (!player) return null;

  const rawLogs = playerData.game_logs.filter(
    (log) => log.playerId === player.playerId
  );

  const gameLogs: GameLog[] = rawLogs.map((log: any) => ({
    ...log,
    fgPercent: log['FG%'],
    tpPercent: log['3P%'],
    ftPercent: log['FTP'],
  }));

  const report =
    playerData.scoutingReports.find((r) => r.playerId === player.playerId)
      ?.report ?? null;

  const averages = gameLogs.length > 0 ? calculateAverages(gameLogs) : null;

  return (
    <div className="main-content-with-bg">
      <div className="background-logo" />
      <div className="main-content-inner">
        <PlayerProfile
          player={player}
          gameLogs={gameLogs}
          averages={averages}
          report={report}
          onClose={() => navigate(-1)}
        />
      </div>
    </div>
  );
}

export default PlayerDetailsPage;
