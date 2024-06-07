// store/useUserStore.ts
import { create } from "zustand";

interface UserState {
  userName: string;
  userImageUrl: string;
  setUserImageUrl: (name: string) => void;
  setUserName: (url: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userImageUrl: "",
  userName: "",
  setUserName: (name) => set({ userName: name }),
  setUserImageUrl: (url) => set({ userImageUrl: url }),
}));
