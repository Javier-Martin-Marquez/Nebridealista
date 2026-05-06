import { create } from "zustand";

export const useFilterStore = create((set) => ({
  metrosMin: "",
  metrosMax: "",
  habitacionesMin: "",

  setMetrosMin: (value) => set({ metrosMin: value }),
  setMetrosMax: (value) => set({ metrosMax: value }),
  setHabitacionesMin: (value) => set({ habitacionesMin: value }),

  clearFilters: () => set({ metrosMin: "", metrosMax: "", habitacionesMin: "" }),
}));
