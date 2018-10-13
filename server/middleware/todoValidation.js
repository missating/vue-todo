import { isEmpty } from 'lodash';
import validator from 'validator';

export const verifyCreateTodo = (req, res, next) => {
  const { title } = req.body;
  const errors = {};

  if (!title) {
    errors.name = 'Name is required';
  } else if (name && validator.isEmpty(name.trim())) {
    errors.name = 'Name cannot be empty';
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};
