import '../css/playerPanel.css';

interface ScoutPanelProps {
  reportText: string;
  playerName: string;
}

export default function ScoutPanel({
  reportText,
  playerName,
}: ScoutPanelProps) {
  return (
    <div className="scout-panel">
      <div className="scroll-wrapper">
        <h3>Scouting Report: {playerName || 'Select a player'}</h3>
        <textarea
          className="scouting-report"
          value={reportText}
          readOnly
        />
      </div>
    </div>
  );
}

