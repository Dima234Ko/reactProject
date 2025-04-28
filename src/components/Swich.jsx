import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setBulleanTask,
  setActivePage,
} from '../store/actions/pageLogTaskActions';

function SwitchComponent() {
  const [isTasks, setIsTasks] = useState(true);
  const dispatch = useDispatch();

  const handleToggle = (newValue) => {
    setIsTasks(newValue);
    dispatch(setBulleanTask(newValue));
    dispatch(setActivePage(1));
  };

  return (
    <div className="switch-container">
      <div className="switch-labels">
        <span
          className={isTasks ? 'active-label' : ''}
          onClick={() => handleToggle(true)}
        >
          Tasks
        </span>
        <span
          className={!isTasks ? 'active-label' : ''}
          onClick={() => handleToggle(false)}
        >
          WiFi
        </span>
      </div>
    </div>
  );
}

export default SwitchComponent;
