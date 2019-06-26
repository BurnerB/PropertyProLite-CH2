import Users from './userRoutes';

const appPrefix = '/api/v1';

const routes = (app) => {
  app.use(appPrefix, Users);
};

export default routes;
