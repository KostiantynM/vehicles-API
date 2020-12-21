class VehicleFilters {
  isActive?: boolean;
  vehicleType?: string;
  deliveryArea?: string;

  constructor(filters: any ) {
    this.isActive = filters.isActive;
    this.vehicleType = filters.vehicleType;
    this.deliveryArea = filters.deliveryArea;
  }
}

export {
  VehicleFilters,
}