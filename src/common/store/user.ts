import { create } from "zustand";

interface UserInfoState {
  userInfo: any[];
  setUserInfo: (userInfo: any[]) => void;
}

export const useUserInfoStore = create<UserInfoState>((set) => ({
  userInfo: [],
  setUserInfo: (userInfo) => set({ userInfo: userInfo }),
}));
