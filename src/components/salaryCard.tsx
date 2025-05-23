import '../css/salaryCard.css';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

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
      <h2>NBA Cap Thresholds</h2>
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

              <Tooltip title={tooltip} arrow placement="top">
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${percent}%`,
                      backgroundColor:
                        percent >= 100
                          ? '#e74c3c'
                          : percent >= 95
                            ? '#f1c40f'
                            : '#3cb371',
                    }}
                  />
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalaryCard;
