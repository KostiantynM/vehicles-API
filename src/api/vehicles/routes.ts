import { Router } from 'express';

import controller from './controller';
import { createVehicle, listVihecles } from './schemas';
import { validate } from '../../util';

const vehicles = (app: Router): void => {
  const router = Router({ mergeParams: true });
  app.use('/vehicles', router);
  router.get('/', validate(listVihecles), controller.list);
  router.post('/', validate(createVehicle), controller.create)
}

export default vehicles;