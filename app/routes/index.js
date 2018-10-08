import express from 'express';
import Todo from '../model/Todo';

const todoRouter = express.Router();

todoRouter.route('/all').get((req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      return res.status(500).send({
        message: 'Something went wrong'
      })
    }
    res.status(200).json(todos)
  })
})

todoRouter.route('/add').post((req, res) => {
  Todo.create(
    {
      name: req.body.name,
      done: false
    }, (err, todo) => {
      if (err) {
        res.status(500).send({
          message: 'Unable to create a todo'
        })
      }
      res.status(201).json(todo)
    }
  )
})

todoRouter.route('/edit/:id').put((req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (err) {
      res.status(500).send({
        message: 'Unable to create a todo'
      })
    } else {
      todo.name = req.body.name
      todo.done = req.body.done

      todo.save(
        (err, todo) => {
          if (err) {
            res.status(500).send({
              message: 'Unable to edit todo'
            })
          } else {
            res.status(200).json(todo)
          }
        }
      )
    }
  })
})

todoRouter.route('/delete/:id').delete((req, res, next) => {
  const id = req.params.id;
  Todo.findByIdAndRemove(id, (err, todo) => {
    if (err) {
      res.status(500).send({
        message: 'Unable to delete a todo'
      })
    }
    res.status(200).json('Successfully removed')
  })
})

export default todoRouter;
