import React, { createContext, ReactNode, useContext, useState } from 'react';
export const themes = {
  light: {
    statusBar: '#1B8C5E',
    headerBg: '#1B8C5E',
    bg: '#f5f5f5',
    cardBg: '#ffffff',
    text: '#1a1a1a',
    subText: '#888888',
    inputBg: '#e8e8e8',
    inputColor: '#1a1a1a',
    inputPlaceholder: '#777777',
    border: '#e8e8e8',
    divider: '#f0f0f0',
    modalBox: '#ffffff',
    closeBtn: '#f0f0f0',
    closeText: '#555555',
  },
  dark: {
    statusBar: '#121212',
    headerBg: '#1e1e1e',
    bg: '#121212',
    cardBg: '#1e1e1e',
    text: '#ffffff',
    subText: '#aaaaaa',
    inputBg: '#2c2c2c',
    inputColor: '#ffffff',
    inputPlaceholder: 'rgba(255,255,255,0.45)',
    border: '#2d2d2d',
    divider: '#2d2d2d',
    modalBox: '#1e1e1e',
    closeBtn: '#2c2c2c',
    closeText: '#ffffff',
  },
};

type ThemeType = typeof themes.light;

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  theme: ThemeType;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};