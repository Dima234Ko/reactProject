import React from 'react';
import { useSelector } from 'react-redux';

const ActionDisplay = () => {
  // Получение текущей страницы из Redux
  const page = useSelector((state) => state.task.page);

  // Определение массива actions в зависимости от page
  const actions = (() => {
    switch (page) {
      case 'status':
        return [
          { name: 'Статус', isActive: true },
          { name: 'PPPoE', isActive: false },
          { name: 'Камера', isActive: false },
        ];
      case 'pppoe':
        return [
          { name: 'PPPoE', isActive: true },
          { name: 'WiFi', isActive: false },
        ];
      case 'wifi':
        return [
          { name: 'WiFi', isActive: true },
          { name: 'Данные', isActive: false },
        ];
      case 'camntu':
        return [{ name: 'Камера', isActive: true }];
      case 'info':
        return [
          { name: 'Фото', isActive: true },
          { name: 'Данные', isActive: false },
        ];
      default:
        return [];
    }
  })();

  return (
    <div className="action-container">
      {actions.length > 1 && (
        <svg className="connection-lines" width="100%" height="100%">
          {actions.length === 2 ? (
            // Для 2 элементов: горизонтальная линия
            <line
              x1="20%"
              y1="50%"
              x2="60%"
              y2="50%"
              stroke="#4b5563"
              strokeWidth="2"
            />
          ) : (
            <>
              {/* Линия к первому неактивному кружку (PPPoE) */}
              <line
                x1="20%"
                y1="50%"
                x2="60%"
                y2="25%"
                stroke="#4b5563"
                strokeWidth="2"
              />
              {/* Линия ко второму неактивному кружку (Камера) */}
              <line
                x1="20%"
                y1="50%"
                x2="60%"
                y2="75%"
                stroke="#4b5563"
                strokeWidth="2"
              />
            </>
          )}
        </svg>
      )}

      {actions.map((action, index) => (
        <div
          key={index}
          className={`action-circle ${action.isActive ? 'active' : 'inactive'}`}
          style={{
            left: actions.length === 1 ? '50%' : index === 0 ? '10%' : '60%',
            top:
              actions.length === 1
                ? '50%'
                : actions.length === 2
                ? '50%'
                : index === 0
                ? '50%'
                : index === 1
                ? '25%'
                : '75%',
            transform:
              actions.length === 1
                ? 'translate(-50%, -50%)'
                : 'translateY(-50%)',
          }}
        >
          {actions.length !== 1 && (
            <span className="action-text">{action.name}</span>
          )}
          {actions.length === 1 && (
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActionDisplay;