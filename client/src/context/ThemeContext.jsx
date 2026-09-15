import { createContext, useCallback, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const resolveTheme = (mode) => {
  if (mode === "light" || mode === "dark") {
    return mode;
  }

  return getSystemTheme();
};

const applyThemeClass = (resolvedTheme) => {
  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
};

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const [resolvedTheme, setResolvedTheme] = useState(() => resolveTheme(mode));

  useEffect(() => {
    localStorage.setItem("theme", mode);

    const updateResolvedTheme = () => {
      const nextResolvedTheme = resolveTheme(mode);
      setResolvedTheme(nextResolvedTheme);
      applyThemeClass(nextResolvedTheme);
    };

    updateResolvedTheme();

    if (mode !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateResolvedTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateResolvedTheme);
    };
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((currentMode) => {
      const currentResolvedTheme = resolveTheme(currentMode);
      return currentResolvedTheme === "dark" ? "light" : "dark";
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{ mode, setMode, resolvedTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
