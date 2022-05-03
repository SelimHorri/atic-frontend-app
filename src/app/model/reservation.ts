
import { Customer } from "./customer";

export class Reservation {

  constructor(
    public id: number,
    public code: string,
    public description: string,
    public startDate: string,
    public cancelDate: string | null,
    public reservationStatus: string,
    public customer: Customer) {
  }



}











