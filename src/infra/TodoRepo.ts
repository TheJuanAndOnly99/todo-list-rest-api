import fs from 'fs';
import { Todo } from '../domain/Todo';

export class TodoRepository {
	private todos: Todo[];
	private readonly filePath: string;

	constructor(filePath: string) {
		this.todos = [];
		this.filePath = filePath;
		this.loadTodos();
	}

	private loadTodos(): void {
		try {
			const json = fs.readFileSync(this.filePath, 'utf8');
			this.todos = JSON.parse(json);
		} catch (error) {
			this.todos = [];
		}
	}

	private saveTodos(): void {
		const json = JSON.stringify(this.todos);
		fs.writeFileSync(this.filePath, json, 'utf8');
	}

	public getAllTodos(): Todo[] {
		return this.todos;
	}

	public getTodoById(id: number): Todo | undefined {
		return this.todos.find((todo) => todo.idCounter === id);
	}

	public getNextId(): number {
		return this.todos.length + 1;
	}

	public saveTodo(todo: Todo): void {
		const index = this.todos.findIndex((t) => t.idCounter === todo.idCounter);
		if (index !== -1) {
			this.todos[index] = todo;
		}
		else {
			this.todos.push(todo);
		}
		this.saveTodos();
	}

	public deleteTodoById(id: number): void {
		this.todos = this.todos.filter((todo) => todo.idCounter !== id);
		this.saveTodos();
	}
}
