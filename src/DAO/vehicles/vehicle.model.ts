import { model } from 'mongoose';
import { IVehicleDocument } from '../../common/Types';
import VehicleSchema from './vehicle.schema';

export const VehicleModel = model<IVehicleDocument>("vehicle", VehicleSchema);