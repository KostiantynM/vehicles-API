import { Document, Model } from 'mongoose';

import {DeliveryArea} from './DeliveryArea'

export interface IVehicle {
  isActive: boolean;
  vehicleColor: string;
  vehicleType: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  deliveryAreas: DeliveryArea[]
}
export interface IVehicleDocument extends IVehicle, Document {}
export interface IVehicleModel extends Model<IVehicleDocument> {}