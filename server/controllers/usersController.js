import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken';
import User from '../model/User'

export default class usersController {
  static createUser(req, res) {
    User.findOne({
      email: req.body.email,
    }).then((existingUser) => {
      if (existingUser) {
        return res.status(409)
          .json({
            errors: {
              status: '409',
              title: 'Conflict',
              detail: 'Username or Email already exist'
            }
          });;
      }
      return User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then((newUser) => {
        const token = generateToken(newUser);
        res.status(201).json({
          data: {
            user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
            },
            token
          }
        });
      })
    })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }


  static loginUser(req, res) {
    User.findOne({
      email: req.body.email
    }).then((foundUser) => {
      if (!foundUser) {
        return res.status(404)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'These credentials do not match our record'
            }
          });;
      }
      if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
        return res.status(404)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'These credentials do not match our record'
            }
          });
      }
      const token = generateToken(foundUser);
      res.status(200)
        .json({
          data: {
            user: {
              name: foundUser.name,
              email: foundUser.email,
            },
            token
          }
        });
    })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }
}
