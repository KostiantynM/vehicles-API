import {isBoolean} from 'lodash';
import {
  VehicleFilters,
  Context,
  OptionsDAO,
  IVehicleDocument,
  IVehicle,
  VehiclePayload
} from '../../common/Types';

import {VehicleModel} from './vehicle.model';

class VehiclesDAO {
  declare model;
  constructor(options: OptionsDAO) {
    this.model = options.model;
  }

  /**
   * Returns vehicles filtered list
   * @param filters param
   * @returns {Promise<Vehicle[]>}
   */
  async getVehiclesList(filter: VehicleFilters, ctx: Context): Promise<IVehicleDocument[]> {
    // TODO: add logs and error handler
    const {
      isActive,
      vehicleType,
      deliveryArea
    } = filter;

    let params = {};
    if (isBoolean(isActive)) {
      params = {...params, isActive};
    }
    if (vehicleType) {
      params = {
        ...params,
        'vehicleType': vehicleType
      }
    }
    if (deliveryArea) {
      params = {
        ...params,
        'deliveryAreas.name': deliveryArea
      }
    }


    const results = await this.model.find(params);
    // this is a good place to omit forbidden fields and prepare results
    return results
  }

  /**
   * Get a vehicle by id
   * @param id param
   * @param ctx param
   * @returns {Promise<Vehicle>}
   */
  async getVehicleById(id: string, ctx: Context): Promise<IVehicle> {
    // TODO: add logs and error handler

    const result = await this.model.findById(id);
    // this is a good place to omit forbidden fields and prepare results
    return result;
  }

  /**
   * Created a vehicle
   * @param data param
   * @param ctx param
   * @returns {Promise<Vehicle>}
   */
  async createVehicle(data: VehiclePayload, ctx: Context): Promise<IVehicle> {
    // TODO: add logs and error handler

    const result = await this.model.create(data);
    // this is a good place to omit forbidden fields and prepare results
    return result;
  }
};

const vehiclesDAO = new VehiclesDAO({model: VehicleModel})

export {
  vehiclesDAO
};