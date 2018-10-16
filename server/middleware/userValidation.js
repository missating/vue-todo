import { isEmpty } from 'lodash';
import validator from 'validator';

export const verifyUserSignUp = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = {};

  if (!name) {
    errors.name = 'Name is required';
  } else if (name && validator.isEmpty(name.trim())) {
    errors.name = 'Name cannot be empty';
  } else if (!email) {
    errors.email = 'Email is required';
  } else if (email && !validator.isEmail(email.trim())) {
    errors.email = 'Email is invalid or empty';
  } else if (!password) {
    errors.password = 'Password is required';
  } else if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (validator.isEmpty(password) ||
    validator.isEmpty(confirmPassword) ||
    (confirmPassword.trim() !== password.trim())) {
    errors.confirmPassword = 'Passwords don\'t match';
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};


export const verifyUserSignin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  if (!email) {
    errors.email = 'Email is required';
  } else if (email && !validator.isEmail(email.trim())) {
    errors.email = 'Email is invalid or empty';
  } else if (!password) {
    errors.password = 'Password is required';
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};
