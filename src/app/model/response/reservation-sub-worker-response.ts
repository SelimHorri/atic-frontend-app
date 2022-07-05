
import { Reservation } from "../reservation";
import { PageResponse } from "./page/page-response";

export class ReservationSubWorkerResponse {
  
  constructor(public reservation: Reservation, public subWorkers: PageResponse) {
  }
  
  
  
}













