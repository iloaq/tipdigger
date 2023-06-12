import React, { createContext, useEffect, useState, ReactNode } from "react";

export const ThemeContext = createContext("");

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(getSystemTheme());

  useEffect(() => {
    const handleSystemThemeChange = () => {
      setTheme(getSystemTheme());
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

const getSystemTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
};
