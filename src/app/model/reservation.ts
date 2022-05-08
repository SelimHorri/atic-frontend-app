
import { ReservationStatus } from "./reservation-status";

export class Reservation {

  constructor(
    public id: number,
    public code: string,
    public description: string | null,
    public startDate: Date | string,
    public cancelDate: Date | string | null,
    public status: ReservationStatus | string,
    public customerId: number) {
  }



}











