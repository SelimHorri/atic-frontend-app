
import { ReservationStatus } from "./reservation-status";

export class Reservation {

  constructor(
    public id: number,
    public code: string,
    public description: string,
    public startDate: Date | string,
    public cancelDate: Date | string,
    public status: ReservationStatus | string,
    public customerId: number,
    public saloonId: number) {
  }



}











