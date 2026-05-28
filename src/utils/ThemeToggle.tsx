import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const nextDark = storedTheme === "dark";
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setDark(nextDark);

    function handleStorage(event: StorageEvent) {
      if (event.key !== "theme") return;
      const nextDark = event.newValue === "dark";
      if (nextDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setDark(nextDark);
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function toggleTheme() {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar modo escuro/claro"
      className="
        flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium
        border transition-all duration-300
        bg-white border-moss-200 text-moss-700 hover:bg-moss-50
        dark:bg-dark-elevated dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-surface
      ">
      {dark ? (
        <>
          <Sun size={16} className="text-terracotta" />
          <span>Claro</span>
        </>
      ) : (
        <>
          <Moon size={16} className="text-moss" />
          <span>Escuro</span>
        </>
      )}
    </button>
  );
}
