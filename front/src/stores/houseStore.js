import { create } from "zustand";

export const useHouseStore = create((set) => ({
  // Función para Corazón (Favoritos)
  toggleFavorite: async (id_vivienda, id_usuario) => {
    if (!id_usuario) return { action: 'error', message: 'Debes estar logueado' };

    try {
      const response = await fetch("http://localhost:3000/favoritos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_vivienda, id_usuario }),
      });
      return await response.json();
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
      return await response.json();
    } catch (error) {
      console.error("Error en toggleSave:", error);
      return { action: 'error' };
    }
  }
}));