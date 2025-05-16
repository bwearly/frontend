import type { PlayerBio } from '../types/PlayerBio';
import type { GameLog } from '../types/GameLog';
import '../css/playerProfile.css';
import defaultImg from '../assets/default.png';
import type { GameAverages } from '../types/GameAverages';

const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainder = inches % 12;
  return `${feet}'${remainder}"`;
};

interface PlayerProfileProps {
  player: PlayerBio;
  gameLogs: GameLog[];
  averages: GameAverages | null;
  onClose: () => void;
}

function PlayerProfile({
  player,
  gameLogs,
  averages,
  onClose,
}: PlayerProfileProps) {
  {
    const totalGames = gameLogs.length;

    const averages = {
      pts: 0,
      reb: 0,
      ast: 0,
      fgm: 0,
      fga: 0,
    };

    if (totalGames > 0) {
      gameLogs.forEach((log) => {
        averages.pts += log.pts;
        averages.reb += log.reb;
        averages.ast += log.ast;
        averages.fgm += log.fgm;
        averages.fga += log.fga;
      });

      averages.pts = +(averages.pts / totalGames).toFixed(1);
      averages.reb = +(averages.reb / totalGames).toFixed(1);
      averages.ast = +(averages.ast / totalGames).toFixed(1);
      averages.fgm = Math.round(averages.fgm / totalGames);
      averages.fga = Math.round(averages.fga / totalGames);
    }

    return (
      <div className="player-profile">
        <button className="back-button" onClick={onClose}>
          ← Back
        </button>
        <img
          className="player-profile-img"
          src={player.photoUrl ?? defaultImg}
          alt={player.name}
        />
        <h2>{player.name}</h2>
        <p>
          <strong>Team:</strong> {player.currentTeam ?? 'N/A'}
        </p>
        <p>
          <strong>League:</strong> {player.league ?? 'N/A'}
        </p>
        <p>
          <strong>Height:</strong> {formatHeight(player.height)}
        </p>
        <p>
          <strong>Weight:</strong> {player.weight} lbs
        </p>
        <p>
          <strong>High School:</strong> {player.highSchool ?? 'N/A'}
        </p>
        <p>
          <strong>Hometown:</strong> {player.homeTown},{' '}
          {player.homeState ?? player.homeCountry}
        </p>
        <p>
          <strong>Nationality:</strong> {player.nationality ?? 'N/A'}
        </p>
        <p>
          <strong>Birth Date:</strong> {player.birthDate ?? 'N/A'}
        </p>

        <h3 style={{ marginTop: '2rem' }}>Game Log</h3>
        <table className="game-log-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>MIN</th>
              <th>PTS</th>
              <th>FGM</th>
              <th>FGA</th>
              <th>FG%</th>
              <th>3PM</th>
              <th>3PA</th>
              <th>3P%</th>
              <th>FTM</th>
              <th>FTA</th>
              <th>FT%</th>
              <th>OREB</th>
              <th>DREB</th>
              <th>REB</th>
              <th>AST</th>
              <th>STL</th>
              <th>BLK</th>
              <th>TOV</th>
              <th>PF</th>
            </tr>
          </thead>
          <tbody>
            {gameLogs.map((log, idx) => (
              <tr key={idx}>
                <td>{new Date(log.date).toLocaleDateString()}</td>
                <td>{log.timePlayed}</td>
                <td>{log.pts}</td>
                <td>{log.fgm}</td>
                <td>{log.fga}</td>
                <td>{log.fgPercent ?? '-'}</td>
                <td>{log.tpm}</td>
                <td>{log.tpa}</td>
                <td>{log.tpPercent ?? '-'}</td>
                <td>{log.ftm}</td>
                <td>{log.fta}</td>
                <td>{log.ftPercent ?? '-'}</td>
                <td>{log.oreb}</td>
                <td>{log.dreb}</td>
                <td>{log.reb}</td>
                <td>{log.ast}</td>
                <td>{log.stl}</td>
                <td>{log.blk}</td>
                <td>{log.tov}</td>
                <td>{log.pf}</td>
              </tr>
            ))}

            {averages && (
              <tr className="average-row">
                <td>
                  <strong>AVG</strong>
                </td>
                <td>{averages.timePlayed}</td>
                <td>{averages.pts}</td>
                <td>{averages.fgm}</td>
                <td>{averages.fga}</td>
                <td>{averages.fgPercent ?? '-'}</td>
                <td>{averages.tpm}</td>
                <td>{averages.tpa}</td>
                <td>{averages.tpPercent ?? '-'}</td>
                <td>{averages.ftm}</td>
                <td>{averages.fta}</td>
                <td>{averages.ftPercent ?? '-'}</td>
                <td>{averages.oreb}</td>
                <td>{averages.dreb}</td>
                <td>{averages.reb}</td>
                <td>{averages.ast}</td>
                <td>{averages.stl}</td>
                <td>{averages.blk}</td>
                <td>{averages.tov}</td>
                <td>{averages.pf}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PlayerProfile;
