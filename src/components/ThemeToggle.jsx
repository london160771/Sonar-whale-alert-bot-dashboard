import { useEffect, useState } from "react";
import "./ThemeToggle.css";

function getInitialTheme() {
  const stored = localStorage.getItem("sonar-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("sonar-theme", theme);
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label="Toggle light and dark mode"
      title="Toggle theme"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}