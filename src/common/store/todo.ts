import { create } from "zustand";

interface TodoState {
  todoData: any[];
  setTodoData: (todoData: any) => void;
  resetTodoData: () => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todoData: [],
  setTodoData: (todoData) =>
    set((state) => ({ todoData: [...state.todoData, todoData] })),
  resetTodoData: () => set({ todoData: [] }),
}));

interface NowTodoState {
  nowTodo: any[];
  setNowTodo: (nowTodo: any[]) => void;
}

export const useNowTodoStore = create<NowTodoState>((set) => ({
  nowTodo: [],
  setNowTodo: (nowTodo) => set({ nowTodo: nowTodo }),
}));
