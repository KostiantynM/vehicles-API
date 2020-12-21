import { Application, Router } from 'express';

import vehicles from './vehicles/routes';

const v1 = (app: Application): void => {
  const router = Router();
  app.use('/api/v1', router);
  // register routes
  vehicles(router);
};

export default {
  v1
};