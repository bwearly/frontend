import '../App.css';
import type { GameAverages } from '../types/GameAverages';
import type { PlayerAverages } from '../types/PlayerAverages';

function getTop5ByStat(players: PlayerAverages[], stat: keyof GameAverages) {
  return [...players]
    .sort((a, b) => (b.averages[stat] as number) - (a.averages[stat] as number))
    .slice(0, 5);
}

function Stats({ players }: { players: PlayerAverages[] }) {
  const statCategories = [
    { title: 'POINTS', key: 'pts' },
    { title: 'REBOUNDS', key: 'reb' },
    { title: 'ASSISTS', key: 'ast' },
    { title: 'BLOCKS', key: 'blk' },
    { title: 'STEALS', key: 'stl' },
    { title: 'TURNOVERS', key: 'tov' },
    { title: 'THREE POINTERS MADE', key: 'tpm' },
    { title: 'FREE THROWS MADE', key: 'ftm' },
  ];

  return (
    <div className="stat-leaders-grid">
      {statCategories.map(({ title, key }) => {
        const top5 = getTop5ByStat(players, key as keyof GameAverages);
        return (
          <div key={key} className="stat-box">
            <h4>{title}</h4>
            <ol>
              {top5.map((p, i) => (
                <li key={i}>
                  <strong>
                    {i + 1}. {p.name}
                  </strong>{' '}
                  {p.team} — {p.averages[key as keyof GameAverages]}
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

export default Stats;
