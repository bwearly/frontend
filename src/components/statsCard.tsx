import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { GameAverages } from '../types/GameAverages';
import type { PlayerAverages } from '../types/PlayerAverages';
import '../css/statsCard.css';

interface StatCardProps {
  players: PlayerAverages[];
}

const statCategories = [
  { title: 'Points', key: 'pts' },
  { title: 'Rebounds', key: 'reb' },
  { title: 'Assists', key: 'ast' },
  { title: 'Blocks', key: 'blk' },
  { title: 'Steals', key: 'stl' },
  { title: 'Turnovers', key: 'tov' },
  { title: '3P%', key: 'tpPercent' },
];

function getTop5ByStat(players: PlayerAverages[], stat: keyof GameAverages) {
  return [...players]
    .filter(
      (p) =>
        typeof p.averages[stat] === 'number' &&
        !isNaN(p.averages[stat] as number)
    )
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

export default function StatCard({ players }: StatCardProps) {
  const [selectedStat, setSelectedStat] = useState(statCategories[0]);

  const top5 = getTop5ByStat(players, selectedStat.key as keyof GameAverages);

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <h2>{selectedStat.title} Leaders</h2>
        <select
          className="form-control"
          value={selectedStat.key}
          onChange={(e) =>
            setSelectedStat(
              statCategories.find((s) => s.key === e.target.value)!
            )
          }
        >
          {statCategories.map((stat) => (
            <option key={stat.key} value={stat.key}>
              {stat.title}
            </option>
          ))}
        </select>
      </div>

      <ol className="stat-card-list">
        {top5.map((p) => (
          <li key={p.playerId}>
            <Link to={`/player/${p.playerId}`} className="scouting-name">
              {p.name}
            </Link>{' '}
            —{' '}
            {formatValue(
              p.averages[selectedStat.key as keyof GameAverages],
              selectedStat.key.includes('Percent')
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
