import { VehicleModel } from './DAO/vehicles/vehicle.model';
import { connect, disconnect } from './lib/db';
import {logger} from "./lib";
import seeds from './testData';
const seeder = async () => {
  await connect({logger, requestId: ''});
  const size = await VehicleModel.count({});
  if (size) return;
  logger.info('Going to add seeds');
  try {
    for (const seed of seeds) {
      await VehicleModel.create(seed);
      logger.info(`Created vehicle ${seed.name.first} ${seed.name.last}`);
    }
    await disconnect({logger, requestId: ''});
    logger.info('Seeds added');
  } catch (e) {
    logger.error(e);
  }
};

export {
  seeder
};