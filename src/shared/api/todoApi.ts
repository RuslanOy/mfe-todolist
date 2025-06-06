import { Todo } from '../types/todo';

const STORAGE_KEY = 'todos';

const fakeFetch = async <T>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const todoApi = {
  getTodos: async (): Promise<Todo[]> => {
    const todos = localStorage.getItem(STORAGE_KEY);
    return fakeFetch(todos ? JSON.parse(todos) : []);
  },

  addTodo: async (todo: Todo): Promise<Todo[]> => {
    const todos = localStorage.getItem(STORAGE_KEY);
    const currentTodos = todos ? JSON.parse(todos) : [];
    const newTodos = [...currentTodos, todo];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    return fakeFetch(newTodos);
  },

  updateTodo: async (id: string, completed: boolean): Promise<Todo[]> => {
    const todos = localStorage.getItem(STORAGE_KEY);
    const currentTodos = todos ? JSON.parse(todos) : [];
    const newTodos = currentTodos.map((todo: Todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    return fakeFetch(newTodos);
  },

  deleteTodo: async (id: string): Promise<Todo[]> => {
    const todos = localStorage.getItem(STORAGE_KEY);
    const currentTodos = todos ? JSON.parse(todos) : [];
    const newTodos = currentTodos.filter((todo: Todo) => todo.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    return fakeFetch(newTodos);
  },
};
