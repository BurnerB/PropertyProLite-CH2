import Users from './userRoutes';
import Property from './propertyRoutes';

const appPrefix = '/api/v1';

const routes = (app) => {
  app.use(appPrefix, Users);
  app.use(appPrefix, Property);
};

export default routes;
