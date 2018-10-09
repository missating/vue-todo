import authorization from '../middleware/authorization';

import todo from '../controllers/todoController';

export default function todoRoutes(app) {
  // create a todo
  app.post('/api/v1/todo/create', authorization, todo.createTodo);

  // get all user todo
  app.get('/api/v1/todo/users/todo', authorization, todo.getUserTodo);
}