import { create } from "zustand";

export const useTheme = create<{
  isDark: boolean;
  toggle: () => void;
  syncFromStorage: () => void;
}>((set) => ({
  isDark: false,
  syncFromStorage: () => {
    try {
      set({ isDark: localStorage.getItem("theme") === "dark" });
    } catch {
      // localStorage unavailable in some environments
    }
  },
  toggle: () =>
    set((state) => {
      const next = !state.isDark;
      localStorage.setItem("theme", next ? "dark" : "light");
      if (next) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      return { isDark: next };
    }),
}));
