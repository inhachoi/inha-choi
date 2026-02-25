import { create } from "zustand";

const getInitialDark = (): boolean => {
  try {
    return localStorage.getItem("theme") === "dark";
  } catch {
    return false;
  }
};

export const useTheme = create<{ isDark: boolean; toggle: () => void }>((set) => ({
  isDark: getInitialDark(),
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
