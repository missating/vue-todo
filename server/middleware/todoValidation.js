import { isEmpty } from 'lodash';
import validator from 'validator';

export const verifyCreateTodo = (req, res, next) => {
  const { title } = req.body;
  const errors = {};

  if (!title) {
    errors.title = 'Name is required';
  } else if (title && validator.isEmpty(title.trim())) {
    errors.title = 'Name cannot be empty';
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};
