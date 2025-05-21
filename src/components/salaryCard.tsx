import '../css/SalaryCard.css';
import { useNavigate } from 'react-router-dom';

const salaryCap = 154600000;
const luxuryTax = 187900000;
const firstApron = 195900000;
const secondApron = 207800000;

const teamSalary = 182188571;

const SalaryCard = () => {
  const navigate = useNavigate();

  const thresholds = [
    { label: 'Salary Cap', value: salaryCap },
    { label: 'Luxury Tax', value: luxuryTax },
    { label: '1st Apron', value: firstApron },
    { label: '2nd Apron', value: secondApron },
  ];

  return (
    <div className="salary-card">
      <h3>Progress Toward NBA Cap Thresholds</h3>
      <div className="bar-chart">
        {thresholds.map((t) => {
          const percent = Math.min((teamSalary / t.value) * 100, 100);
          const tooltip = `$${teamSalary.toLocaleString()} / $${t.value.toLocaleString()} (${percent.toFixed(1)}%)`;

          return (
            <div
              className="bar-row"
              key={t.label}
              onClick={() => navigate('/currentRoster')}
            >
              <div className="bar-label">{t.label}</div>
              <div className="bar-track" title={tooltip}>
                <div className="bar-fill" style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalaryCard;
