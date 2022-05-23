
import { Credential } from "../credential";
import { Customer } from "../customer";
import { Reservation } from "../reservation";
import { PageResponse } from "./page/page-response";

export class CustomerReservationResponse {
  
  constructor(
    public customer: Customer,
    public credential: Credential,
    public reservations: PageResponse) {
  }
  
  
  
}













