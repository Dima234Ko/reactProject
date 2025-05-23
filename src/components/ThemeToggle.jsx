import React, { useState, useEffect } from 'react';

function ThemeToggle({ className = 'theme-toggle', id, disabled = false }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleToggle = () => {
    if (!disabled) {
      setIsDarkMode(!isDarkMode);
    }
  };

  return (
    <label
      className={`${className} ${isDarkMode ? 'dark' : ''}`}
      id={id}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={handleToggle}
        disabled={disabled}
        style={{ display: 'none' }}
      />
      <span className="slider">
        <span className="thumb" />
      </span>
    </label>
  );
}

export default ThemeToggle;
