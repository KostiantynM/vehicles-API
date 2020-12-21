import {VehicleFilters} from "./VehicleFilters";
import {Context} from "./Context";
import {IVehicle, IVehicleDocument} from "./IVehicle";

export interface IVehiclesDAO {
  getVehicleById(id: string, ctx: Context): Promise<IVehicle>;
  getVehiclesList(filter: VehicleFilters, ctx: Context): Promise<IVehicleDocument[]>;
  createVehicle(data: IVehicle, ctx: Context): Promise<IVehicle>;
}