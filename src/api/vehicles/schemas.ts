import { Joi, Segments } from 'celebrate';

import { VehicleTypes, Areas } from '../../common/Enums'

const listVihecles = {
  [Segments.QUERY]: Joi.object({
    isActive: Joi.boolean().optional(),
    vehicleType: Joi.string().valid(...Object.values(VehicleTypes)).optional(),
    deliveryArea: Joi.string().valid(...Object.values(Areas)).optional(),
  })
};

const createVehicle = {
  [Segments.BODY]: Joi.object({
    isActive: Joi.boolean().required(),
    vehicleColor: Joi.string().required(),
    vehicleType: Joi.string().required(),
    name: {
      first: Joi.string().required(),
      last: Joi.string().required(),
    },
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    deliveryAreas: Joi.array().items({
      name: Joi.string().required(),
    }).required()
  })
};

export {
  listVihecles,
  createVehicle,
}