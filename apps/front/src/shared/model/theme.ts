import { create } from "zustand";

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
}

const getInitialDark = (): boolean => {
  try {
    return localStorage.getItem("theme") === "dark";
  } catch {
    return false;
  }
};

export const useTheme = create<ThemeStore>((set) => ({
  isDark: getInitialDark(),
  toggle: () =>
    set((state) => {
      const next = !state.isDark;
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", next ? "dark" : "");
      return { isDark: next };
    }),
}));
