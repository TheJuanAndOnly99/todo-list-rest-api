import { Request, Response } from 'express';
import { Todo } from '../domain/Todo';
import { TodoRepository } from '../infra/TodoRepo';

export class TodoController {
	private todoRepository: TodoRepository;

	constructor(todoRepository: TodoRepository) {
		this.todoRepository = todoRepository;
	}

	getAllTodos(_req: Request, res: Response): void {
		res.set('Authorization', 'Basic ' + process.env.AUTH);
		const todos = this.todoRepository.getAllTodos();
		res.json(todos);
	}

	createTodo(req: Request, res: Response): void {
		res.set('Authorization', 'Basic ' + process.env.AUTH);
		const { title, text, completed } = req.body;
		const newTodo: Todo = new Todo({
			idCounter: this.todoRepository.getNextId(),
			title,
			text,
			completed
		});
		this.todoRepository.saveTodo(newTodo);
		res.sendStatus(201);
	}

	toggleTodoCompletion(req: Request, res: Response): void {
		const { id } = req.params;
		const todo = this.todoRepository.getTodoById(parseInt(id, 10));
		if (todo) {
			todo.completed = !todo.completed;
			this.todoRepository.saveTodo(todo);
			res.sendStatus(200);
		}
		else {
			res.sendStatus(404);
		}
	}

	deleteTodoById(req: Request, res: Response): void {
		const { id } = req.params;
		this.todoRepository.deleteTodoById(parseInt(id, 10));
		res.sendStatus(200);
	}
}
