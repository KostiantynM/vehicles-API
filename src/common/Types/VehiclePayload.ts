class VehiclePayload {
  isActive: boolean;
  vehicleColor: string;
  vehicleType: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  deliveryAreas: [{
    name: string
  }]

  constructor(data: any ) {
    this.isActive = data.isActive;
    this.vehicleColor = data.vehicleColor;
    this.vehicleType = data.vehicleType;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.deliveryAreas = data.deliveryAreas;
  }
}

export {
  VehiclePayload,
}