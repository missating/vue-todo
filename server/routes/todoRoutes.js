import authorization from '../middleware/authorization';

import todo from '../controllers/todoController';

export default function todoRoutes(app) {
  // create a todo
  app.post('/api/v1/todo/create', authorization, todo.createTodo);

  // get all todo
  app.get('/api/v1/todo', authorization, todo.getTodo);

  // update a todo
  app.put('/api/v1/todo/edit/:id', authorization, todo.editTodo);

  // delete a todo
  app.delete('/api/v1/todo/delete/:id', authorization, todo.deleteTodo)
}
