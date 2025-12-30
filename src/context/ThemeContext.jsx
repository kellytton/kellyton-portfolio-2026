import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(undefined);

export const themes = {
  light: {
    background: "#FFFCF5",
    text: "#333333",
  },
  dark: {
    background: "#1a1a1a",
    text: "#f5f5f5",
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    const currentTheme = themes[theme];

    root.style.setProperty("--color-background", currentTheme.background);
    root.style.setProperty("--color-text", currentTheme.text);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
