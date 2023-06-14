import express from 'express';
import bodyParser from 'body-parser';
import { appRoutes } from './infra/routes/routes';
import { TodoController } from './application/TodoController';
import { TodoRepository } from './infra/repositories/TodoRepository';
import { addCacheControlHeader, enableCORS } from './infra/middlewares/middlewares';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(bodyParser.json());

const todoRepository = new TodoRepository('todos.json');
const todoController = new TodoController(todoRepository);

// Apply middleware functions to add Cache-Control header and enable CORS
app.use(addCacheControlHeader);
app.use(enableCORS);

// Register routes
appRoutes(app, todoController);

const server = app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});

export { app, server };
