import { create } from "zustand";


export const useUserInfoStore = create((set) => ({
  userInfo:[],
  setUserInfo:(userInfo) => set({userInfo: userInfo})
}))

