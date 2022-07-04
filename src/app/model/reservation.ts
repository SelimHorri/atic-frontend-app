
import { Customer } from "./customer";
import { ReservationStatus } from "./reservation-status";
import { Saloon } from "./saloon";

export class Reservation {

  constructor(
    public id: number,
    public code: string,
    public description: string,
    public startDate: Date | string,
    public cancelDate: Date | string | null,
    public completeDate: Date | string | null,
    public status: ReservationStatus | string,
    public customer: Customer,
    public saloon: Saloon) {
  }



}











