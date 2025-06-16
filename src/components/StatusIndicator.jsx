import { useEffect, useState } from 'react';
import { requestAPI } from '../functions/api';

function StatusIndicator() {
  const [isOnline, setIsOnline] = useState(null);

  const checkStatus = () => {
    console.log ('update');
    const result = Math.random() > 0.5;
    setIsOnline(result);
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusClass = () => {
    if (isOnline === null) return 'input-status-indicator neutral';
    return isOnline
      ? 'input-status-indicator online'
      : 'input-status-indicator offline';
  };

  return (
    <div className="input-status-wrapper">
      <input
        className="some-input"
        id="level_Ntu"
        type="text"
        disabled
        value="-12.39"
      />
      <div className="input-status-indicator-wrapper">
        <div className={getStatusClass()} />
      </div>
    </div>
  );
}

export default StatusIndicator;
