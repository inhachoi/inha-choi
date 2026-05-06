import { create } from "zustand";
import { persist } from "zustand/middleware";

const applyTheme = (isDark: boolean) => {
  if (isDark) document.documentElement.setAttribute("data-theme", "dark");
  else document.documentElement.removeAttribute("data-theme");
};

export const useTheme = create<{ isDark: boolean; toggle: () => void }>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () =>
        set((state) => {
          const next = !state.isDark;
          applyTheme(next);
          return { isDark: next };
        }),
    }),
    {
      name: "theme",
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.isDark);
      },
    }
  )
);
