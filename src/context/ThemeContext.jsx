import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children }) => {
  // Check local storage or default to dark
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('themeMode');
    return saved ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeModeContext);
