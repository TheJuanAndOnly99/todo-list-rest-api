import express from 'express';
import bodyParser from 'body-parser';
import { TodoController } from './application/TodoController';
import { TodoRepository } from './infra/repositories/TodoRepository';
import { addAuthHeader, addCacheControlHeader, enableCORS } from './infra/middlewares/middlewares';
import { requireBasicAuth } from './infra/middlewares/middlewares';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(bodyParser.json());

const todoRepository = new TodoRepository('todos.json');
const todoController = new TodoController(todoRepository);

// Middleware to add Cache-Control: no-cache header
app.use(addCacheControlHeader);

// Middleware to enable CORS
app.use(enableCORS);

app.get('/todos', addAuthHeader, requireBasicAuth, (req, res) =>
	todoController.getAllTodos(req, res)
);
app.post('/todos', addAuthHeader, requireBasicAuth, (req, res) =>
	todoController.createTodo(req, res)
);
app.put('/todos/:id', addAuthHeader, requireBasicAuth, (req, res) =>
	todoController.toggleTodoCompletion(req, res)
);
app.delete('/todos/:id', addAuthHeader, requireBasicAuth, (req, res) =>
	todoController.deleteTodoById(req, res)
);

const server = app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});

export { app, server };
