import userRoutes from './userRoutes';
import todoRoutes from './todoRoutes';

const routes = (app) => {
  userRoutes(app);
  todoRoutes(app)
};

export default routes;
