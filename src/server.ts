import express from 'express';
import bodyParser from 'body-parser';
import { TodoController } from './application/TodoController';
import { TodoRepository } from './infra/TodoRepo';

const app = express();
app.use(bodyParser.json());

const todoRepository = new TodoRepository('todos.json');
const todoController = new TodoController(todoRepository);

app.get('/todos', (req, res) => todoController.getAllTodos(req, res));
app.post('/todos', (req, res) => todoController.createTodo(req, res));
app.put('/todos/:id', (req, res) => todoController.toggleTodoCompletion(req, res));
app.delete('/todos/:id', (req, res) => todoController.deleteTodoById(req, res));

const server = app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});

export { app, server };
