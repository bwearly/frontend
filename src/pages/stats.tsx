import '../App.css';
import '../css/stats.css';
import type { GameAverages } from '../types/GameAverages';
import type { PlayerAverages } from '../types/PlayerAverages';
import { Link } from 'react-router-dom';

function getTop5ByStat(players: PlayerAverages[], stat: keyof GameAverages) {
  return [...players]
    .filter((p) => {
      const val = p.averages[stat];
      return typeof val === 'number' && !isNaN(val);
    })
    .sort((a, b) => (b.averages[stat] as number) - (a.averages[stat] as number))
    .slice(0, 5);
}

function formatValue(
  val: string | number | null | undefined,
  isPercent = false
): string {
  if (val == null) return '-';
  if (typeof val === 'number') {
    const formatted = val.toFixed(1);
    return isPercent ? `${formatted}%` : formatted;
  }
  return val.toString();
}

function Stats({ players }: { players: PlayerAverages[] }) {
  const statCategories = [
    { title: 'POINTS', key: 'pts' },
    { title: 'REBOUNDS', key: 'reb' },
    { title: 'ASSISTS', key: 'ast' },
    { title: 'BLOCKS', key: 'blk' },
    { title: 'STEALS', key: 'stl' },
    { title: 'TURNOVERS', key: 'tov' },
    { title: 'THREE POINTERS PERCENT', key: 'tpPercent' },
  ];

  return (
    <div className="main-content-with-bg">
      <div className="background-logo" />
      <h1 className="branding">Stats</h1>
      <div className="main-content-inner">
        <div className="stat-leaders-grid">
          {statCategories.map(({ title, key }) => {
            const top5 = getTop5ByStat(players, key as keyof GameAverages);
            return (
              <div key={key} className="stat-box">
                <h4>{title}</h4>
                <ol>
                  {top5.map((p) => (
                    <li key={p.playerId}>
                      <Link
                        to={`/player/${p.playerId}`}
                        className="scouting-name"
                      >
                        {p.name}
                      </Link>{' '}
                      {p.team} —{' '}
                      {formatValue(
                        p.averages[key as keyof GameAverages],
                        key.includes('Percent')
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Stats;
