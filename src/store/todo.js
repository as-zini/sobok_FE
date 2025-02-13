import { create } from "zustand";


export const useTodoStore = create((set) => ({
  todoData:[],
  setTodoData:(todoData) => set((state) => ({todoData: [...state.todoData,todoData]}))
}))

