import { create } from 'zustand';
import { Todo, TodoState } from '../../../shared/types/todo';
import { todoApi } from '../../../shared/api/todoApi';

export const useTodoStore = create<
  TodoState & {
    fetchTodos: () => Promise<void>;
    addTodo: (title: string) => Promise<void>;
    toggleTodo: (id: string) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
  }
>((set) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await todoApi.getTodos();
      const todos = response.reverse();
      set({ todos, isLoading: false });
    } catch (error) {
      set({ error: `Failed to fetch todos: ${error}`, isLoading: false });
    }
  },

  addTodo: async (title: string) => {
    set({ isLoading: true, error: null });
    try {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      const todos = await todoApi.addTodo(newTodo);
      set({ todos, isLoading: false });
    } catch (error) {
      set({ error: `Failed to add todo: ${error}`, isLoading: false });
    }
  },

  toggleTodo: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const todo = useTodoStore.getState().todos.find((t) => t.id === id);
      if (todo) {
        const todos = await todoApi.updateTodo(id, !todo.completed);
        set({ todos, isLoading: false });
      }
    } catch (error) {
      set({ error: `Failed to update todo: ${error}`, isLoading: false });
    }
  },

  deleteTodo: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const todos = await todoApi.deleteTodo(id);
      set({ todos, isLoading: false });
    } catch (error) {
      set({ error: `Failed to delete todo: ${error}`, isLoading: false });
    }
  },
}));
