import React from 'react';
import { useTheme } from './ThemeContext';
import './theme.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: 'var(--card-background)',
        color: 'var(--text-color)'
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
