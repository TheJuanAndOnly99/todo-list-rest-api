import { Todo } from '../../../domain/Todo';

export interface ITodoRepository {
  getAllTodos(): Todo[];
  getTodoById(id: number): Todo | undefined;
  getNextId(): number;
  saveTodo(todo: Todo): void;
  deleteTodoById(id: number): void;
}


