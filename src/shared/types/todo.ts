export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}
