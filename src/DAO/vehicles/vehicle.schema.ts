import { Schema } from 'mongoose';

const VehicleSchema = new Schema({
  isActive: Boolean,
  vehicleColor: String,
  vehicleType: String,
  name: {
    first: String,
    last: String
  },
  email: String,
  phone: String,
  deliveryAreas: [{
    name: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});
export default VehicleSchema;