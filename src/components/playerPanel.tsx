import PlayerList from './playerList';
import '../css/playerPanel.css';
import type { PlayerBio } from '../types/PlayerBio';

interface PlayerPanelProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export default function PlayerPanel({
  isOpen,
  toggleOpen,
  onSelectPlayer,
}: PlayerPanelProps & { onSelectPlayer: (player: PlayerBio) => void }) {
  return (
    <div className={`player-panel ${isOpen ? 'open' : 'closed'}`}>
      <div className="toggle-rail" onClick={toggleOpen}>
        <span className="rail-text">Players{isOpen ? '◀' : '▶'}</span>
      </div>
      {isOpen && (
        <div className="scroll-wrapper">
          <PlayerList onSelect={onSelectPlayer} />
        </div>
      )}
    </div>
  );
}
