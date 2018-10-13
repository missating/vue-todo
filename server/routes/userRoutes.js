import user from '../controllers/usersController';
import {
  verifyUserSignUp,
  verifyUserSignin
} from '../middleware/userValidation';

export default function userRouter(app) {
  // create a user
  app.post('/api/v1/users/signup', verifyUserSignUp, user.createUser);

  // login user
  app.post('/api/v1/users/signin', verifyUserSignin, user.loginUser)
}
