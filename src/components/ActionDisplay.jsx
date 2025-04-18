import React from 'react';

const ActionDisplay = () => {
  // Статические данные для кружков
  const actions = [
    { name: 'Статус', isActive: true },
    { name: 'PPPoE', isActive: false },
    { name: 'Камера', isActive: false },
  ];

  return (
    <div className="action-container">
      <svg className="connection-lines" width="100%" height="100%">
        {/* Линия к первому неактивному кружку (Настройка PPPoE) */}
        <line
          x1="20%"
          y1="50%"
          x2="60%"
          y2="25%"
          stroke="#4b5563"
          strokeWidth="2"
        />
        {/* Линия ко второму неактивному кружку (Настройка камеры) */}
        <line
          x1="20%"
          y1="50%"
          x2="60%"
          y2="75%"
          stroke="#4b5563"
          strokeWidth="2"
        />
      </svg>

      {actions.map((action, index) => (
        <div
          key={index}
          className={`action-circle ${action.isActive ? 'active' : 'inactive'}`}
          style={{
            left: index === 0 ? '10%' : '60%',
            top: index === 0 ? '50%' : index === 1 ? '25%' : '75%',
          }}
        >
          <span className="action-text">{action.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ActionDisplay;