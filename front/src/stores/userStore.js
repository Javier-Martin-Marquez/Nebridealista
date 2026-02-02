import { create } from "zustand";

export const useUserStore = create(set => ({
  userName: "",
  idUsuario: null,
  login: (name, id) => {
    set({ 
      userName: name, 
      idUsuario: id 
    });
  },
  logout: () => {
    set({ 
      userName: "", 
      idUsuario: null 
    });
  }
}));