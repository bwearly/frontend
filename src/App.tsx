import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Navigation from './components/navigation';
import ComparePlayers from './pages/comparePlayers';
import CurrentRoster from './pages/currentRoster';
import ScoutReports from './pages/scoutReports';
import Players from './pages/players';
import Stats from './pages/stats';
import PlayerDetailsPage from './pages/playerDetailsPage';

import playerData from './api/PlayerData.json';
import { transformRawLog } from './utils/TransformGameLogs';
import groupLogsByPlayer from './utils/GroupLogsByPlayers';
import { calculateAverages } from './utils/calculateAverages';

function App() {
  const rawLogs = playerData.game_logs.map(transformRawLog);

  const grouped = groupLogsByPlayer(rawLogs);

  const players = grouped.map((p) => ({
    playerId: p.playerId,
    name: p.name,
    team: p.team,
    averages: calculateAverages(p.logs),
  }));

  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/stats" element={<Stats players={players} />} />
            <Route path="/compare" element={<ComparePlayers />} />
            <Route path="/currentRoster" element={<CurrentRoster />} />
            <Route path="/scoutReports" element={<ScoutReports />} />
            <Route path="/player/:id" element={<PlayerDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
