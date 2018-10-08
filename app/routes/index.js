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

export default todoRouter;