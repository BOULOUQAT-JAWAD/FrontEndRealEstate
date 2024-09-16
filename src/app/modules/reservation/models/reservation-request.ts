export interface ReservationRequest {
    reservationId?: number;
    propertyId: number;
    checkinDate: string;
    checkoutDate: string;
    stripePaymentId?: string;
  }