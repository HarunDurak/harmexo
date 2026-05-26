import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({ isDark: true, toggle: () => {} });

export const useAppTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  const toggle = () => setIsDark(p => !p);
  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
