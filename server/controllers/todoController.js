import Todo from '../model/Todo';
import User from '../model/User'

export default class todoController {
  static createTodo(req, res) {
    Todo.create({
      user: req.userId,
      title: req.body.title,
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

  static getTodo(req, res) {
    User.findOne({
      _id: req.userId
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
      Todo.find({ user: req.userId }).then((allUserTodo) => {
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


  static editTodo(req, res) {
    Todo.findById({
      _id: req.params.id
    }).then((existingTodo) => {
      if (!existingTodo) {
        return res.status(404)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'Cannot find a Todo with that Id'
            }
          })
      }
      Todo.findByIdAndUpdate(
        { _id: req.params.id },
        { title: req.body.title, done: req.body.done },
        { new: true }
      ).then(updatedTodo => {
        res.status(200)
          .json({
            data: {
              Todo: updatedTodo
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

  static deleteTodo(req, res) {
    Todo.findById({
      _id: req.params.id
    }).then((existingTodo) => {
      if (!existingTodo) {
        return res.status(404)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'Cannot find a Todo with that Id'
            }
          })
      }
      Todo.findByIdAndRemove({
        _id: req.params.id
      }).then(() => res.status(200).json({
        message: 'Todo was sucessfully deleted'
      }))
    })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }
}
