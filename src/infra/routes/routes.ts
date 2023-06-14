import { Express, Request, Response } from 'express';
import { TodoController } from '../../application/TodoController';
import { addAuthHeader, requireBasicAuth } from '../../infra/middlewares/middlewares';

export function appRoutes(app: Express, todoController: TodoController): void {
  // Middleware to add authentication headers and require basic authentication
  app.use(addAuthHeader);
  app.use(requireBasicAuth);

  // Route: GET /todos
  app.get('/todos', (req: Request, res: Response) => {
    todoController.getAllTodos(req, res);
  });

  // Route: POST /todos
  app.post('/todos', (req: Request, res: Response) => {
    todoController.createTodo(req, res);
  });

  // Route: PUT /todos/:id
  app.put('/todos/:id', (req: Request, res: Response) => {
    todoController.toggleTodoCompletion(req, res);
  });

  // Route: DELETE /todos/:id
  app.delete('/todos/:id', (req: Request, res: Response) => {
    todoController.deleteTodoById(req, res);
  });
}
