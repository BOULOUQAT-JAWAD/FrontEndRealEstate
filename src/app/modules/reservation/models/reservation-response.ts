import { ReservationStatus } from "./reservation-status";

export interface ReservationResponse {
    reservationId: number;
    propertyId: number;
    checkinDate: string;
    checkoutDate: string;
    status: ReservationStatus;
    price: number;
}
