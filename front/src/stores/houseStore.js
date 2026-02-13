import { create } from "zustand";

export const useHouseStore = create((set, get) => ({
  favorites: [], 
  saved: [],

  clearHouseData: () => set({ favorites: [], saved: [] }),

  // Función para Corazón (Favoritos)
  toggleFavorite: async (id_vivienda, id_usuario) => {
    if (!id_usuario) return { action: 'error', message: 'Debes estar logueado' };

    try {
      const response = await fetch("http://localhost:3000/favoritos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_vivienda, id_usuario }),
      });
      
      const result = await response.json();

      if (response.ok) {
        const currentFavs = get().favorites;
        // Si ya estaba, lo quitamos; si no, lo añadimos para actualizar el color
        if (currentFavs.includes(id_vivienda)) {
          set({ favorites: currentFavs.filter(id => id !== id_vivienda) });
        } else {
          set({ favorites: [...currentFavs, id_vivienda] });
        }
      }
      return result;
    } catch (error) {
      console.error("Error en toggleFavorite:", error);
      return { action: 'error' };
    }
  },

  // Función para Marcador (Guardar Búsqueda/Vivienda)
  toggleSave: async (id_vivienda, id_usuario) => {
    if (!id_usuario) return { action: 'error', message: 'Debes estar logueado' };

    try {
      const response = await fetch("http://localhost:3000/historial/busqueda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_vivienda, id_usuario }),
      });
      
      const result = await response.json();

      if (response.ok) {
        const currentSaved = get().saved;
        if (currentSaved.includes(id_vivienda)) {
          set({ saved: currentSaved.filter(id => id !== id_vivienda) });
        } else {
          set({ saved: [...currentSaved, id_vivienda] });
        }
      }
      return result;
    } catch (error) {
      console.error("Error en toggleSave:", error);
      return { action: 'error' };
    }
  }
}));