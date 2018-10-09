import user from '../controllers/usersController';

export default function userRouter(app) {
  // create a user
  app.post('/api/v1/users/signup', user.createUser);

  // login user
  app.post('/api/v1/users/signin', user.loginUser)
}