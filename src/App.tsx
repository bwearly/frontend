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

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/stats" element={<Stats />} />
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
