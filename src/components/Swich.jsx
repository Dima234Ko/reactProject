// SwitchComponent.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { setBulleanTask } from "../store/actions/pageLogTaskActions";

export function SwitchComponent() { 
  const [isTasks, setIsTasks] = useState(true);
  const dispatch = useDispatch(); 

  const handleToggle = (newValue) => {
    setIsTasks(newValue);
    dispatch(setBulleanTask(newValue)); 
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