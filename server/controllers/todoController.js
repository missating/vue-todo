import Todo from '../model/Todo';
import User from '../model/User'

export default class todoController {
  static createTodo(req, res) {
    Todo.create({
      user: '5bbd17153d2d7e016fe62a56',
      title: req.body.title,
      done: false
    }).then((newTodo) => {
      res.status(201).json({
        data: {
          Todo: newTodo
        }
      })
    })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }


  static getUserTodo(req, res) {
    User.findOne({
      name: req.name
    }).then((existingUser) => {
      if (!existingUser) {
        return res.status(404)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'A user with that id is not found'
            }
          });
      }
      Todo.find({ user: '5bbd17153d2d7e016fe62a56' }).then((allUserTodo) => {
        res.status(200).json({
          data: {
            Todos: allUserTodo
          }
        })
      })
    })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }
}
