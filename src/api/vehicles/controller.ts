import {Request, Response, NextFunction} from 'express';

import { vehiclesDAO } from '../../DAO/vehicles/vehicles.dao'
import { VehicleFilters, VehiclePayload } from '../../common/Types'

const list = async (req: Request, res: Response, next: NextFunction) => {
  const {
    ctx: {
      logger,
    },
  } = req;
  try {
    logger.info('[vehicles.list]: got request');
    const filter = new VehicleFilters(req.query);
    const result = await vehiclesDAO.getVehiclesList(filter, req.ctx);
    logger.info('[vehicles.list]: prepare response');
    res.json(result);
  } catch (err) {
    logger.error('[vehicles.create]: failed to get vehicles list', err);
    next(err);
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  const {
    ctx: {
      logger
    }
  } = req;
  try {
    logger.info('[vehicles.create]: going to create vehicle');
    const payload = new VehiclePayload(req.body);
    const result = await vehiclesDAO.createVehicle(payload, req.ctx);
    logger.info('[vehicles.create]: vehicle created');
    res.json(result);
  } catch (err) {
    logger.error('[vehicles.create]: failed to create vehicle', err);
    next(err);
  }
}

export default {
  list,
  create,
}