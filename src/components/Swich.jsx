import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBulleanTask, setActivePage } from '../store/actions/pageLogTaskActions';

function SwitchComponent({ options = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const handleToggle = (index) => {
    setSelectedIndex(index);

    dispatch(setActivePage(1));

    if (typeof options[index].value === 'boolean') {
      dispatch(setBulleanTask(options[index].value));
    }
  };

  return (
    <div className="switch-container">
      <div className="switch-labels">
        {options.map((option, index) => (
          <span
            key={index}
            className={selectedIndex === index ? 'active-label' : ''}
            onClick={() => handleToggle(index)}
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SwitchComponent;
