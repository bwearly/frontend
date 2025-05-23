import { NavLink, useNavigate } from 'react-router-dom';
import '../css/navigation.css';

export default function Navigation() {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Players', path: '/players' },
    { label: 'Stats', path: '/stats' },
    { label: 'Current Roster', path: '/currentRoster' },
    { label: 'Compare Players', path: '/compare' },
    { label: 'Scouting Reports', path: '/scoutReports' },
  ];

  return (
    <div className="sidebar">
      <div className="logo" onClick={() => navigate('/')}>
        <img src="/dallas_mavericks.png" alt="Mavs Logo" className="logo-img" />
        <span>Draft Board</span>
      </div>
      <ul className="nav-list">
        {navItems.map(({ label, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
