import fs from 'fs';
import { Todo } from '../../domain/Todo';
import { ITodoRepository } from './interfaces/ITodoRepository';

export class TodoRepository implements ITodoRepository {
	private todos: Todo[];
	private readonly filePath: string;
	private nextId: number;

	constructor(filePath: string) {
		this.todos = [];
		this.filePath = filePath;
		this.nextId = 1;
		this.loadTodos();
	}

	private loadTodos(): void {
		try {
			const json = fs.readFileSync(this.filePath, 'utf8');
			this.todos = JSON.parse(json);
			this.updateNextId(); // Update nextId based on loaded todos
		} catch (error) {
			this.todos = [];
			this.nextId = 1; // Reset nextId to 1 if loading fails
		}
	}

	private saveTodos(): void {
		const json = JSON.stringify(this.todos);
		fs.writeFileSync(this.filePath, json, 'utf8');
	}

	private updateNextId(): void {
		const maxId = this.todos.reduce((max, todo) => Math.max(max, todo.idCounter), 0);
		this.nextId = maxId + 1;
	}

	public getAllTodos(): Todo[] {
		return this.todos;
	}

	public getTodoById(id: number): Todo | undefined {
		return this.todos.find((todo) => todo.idCounter === id);
	}

	public getNextId(): number {
		return this.nextId;
	}

	public saveTodo(todo: Todo): void {
		const index = this.todos.findIndex((t) => t.idCounter === todo.idCounter);
		if (index !== -1) {
			this.todos[index] = todo;
		}
		else {
			todo.idCounter = this.nextId++; // Update the todo's idCounter
			this.todos.push(todo);
		}
		this.saveTodos();
	}

	public deleteTodoById(id: number): void {
		this.todos = this.todos.filter((todo) => todo.idCounter !== id);
		this.saveTodos();
	}
}
