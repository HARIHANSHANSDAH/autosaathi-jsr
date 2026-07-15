import React, { createContext, useContext, useState } from 'react';

// Centralized themes dictionary
export const themes = {
  light: {
    statusBar: '#1B8C5E',
    headerBg: '#1B8C5E',
    bg: '#f5f5f5',
    cardBg: '#ffffff',
    text: '#1a1a1a',
    subText: '#888888',
    border: '#e8e8e8',
    divider: '#f0f0f0',
    modalBox: '#ffffff',
    closeBtn: '#f0f0f0',
    closeText: '#555555',
    inputBg: '#e8e8e8',
    inputColor: '#1a1a1a',
  },
  dark: {
    statusBar: '#121212',
    headerBg: '#1e1e1e',
    bg: '#121212',
    cardBg: '#1e1e1e',
    text: '#ffffff',
    subText: '#aaaaaa',
    border: '#2d2d2d',
    divider: '#2d2d2d',
    modalBox: '#1e1e1e',
    closeBtn: '#2c2c2c',
    closeText: '#ffffff',
    inputBg: '#2c2c2c',
    inputColor: '#ffffff',
  },
};

type Theme = typeof themes.light;

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};