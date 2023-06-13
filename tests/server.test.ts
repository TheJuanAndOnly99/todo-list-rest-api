import request from 'supertest';
import { TodoProps } from '../src/domain/Todo';
import { app, server } from '../src/server';

jest.mock('../src/domain/Todo', () => {
	class MockTodo {
		public readonly idCounter: number;
		public title: string;
		public text: string;
		public completed: boolean;

		constructor(props: TodoProps) {
			this.idCounter = props.idCounter;
			this.title = props.title;
			this.text = props.text;
			this.completed = props.completed;
		}

		public getId(): number {
			return this.idCounter;
		}

		public getTitle(): string {
			return this.title;
		}

		public isCompleted(): boolean {
			return this.completed;
		}

		public setTitle(title: string): void {
			this.title = title;
		}

		public setText(text: string): void {
			this.text = text;
		}

		public setCompleted(): void {
			this.completed = !this.completed;
		}
	}

	return { Todo: MockTodo };
});

describe('Todo API', () => {
	// close express
	afterAll(() => {
		server.close();
	});

	describe('POST /todos', () => {
		test('should create a new todo', async () => {
			const newTodo = {
				title: 'New Todo',
				text: 'New Todo Text',
				completed: false
			};

			// Make the POST request
			const response = await request(app).post('/todos').send(newTodo);

			// Expect the response to have a successful status
			expect(response.status).toBe(201);
		});
	});

	describe('GET /todos', () => {
		test('should return all todos', async () => {
			// Make the GET request
			const response = await request(app).get('/todos');

			// Expect the response to contain the mock todos
			expect(response.status).toBe(200);
			expect(response.body).toEqual([
				{
					completed: false,
					idCounter: 1,
					text: 'New Todo Text',
					title: 'New Todo'
				}
			]);
		});
	});

	describe('PUT /todos/:id', () => {
		test('should update a todo given its id', async () => {
			// Make the PUT request
			const response = await request(app).put('/todos/1');

			// Expect the response to have a successful status
			expect(response.status).toBe(200);
		});
	});

	describe('DELETE /todos/:id', () => {
		test('should delete a todo given its id', async () => {
			// Make the DELETE request
			const response = await request(app).delete('/todos/1');

			// Expect the response to have a successful status
			expect(response.status).toBe(200);
		});
	});
});
