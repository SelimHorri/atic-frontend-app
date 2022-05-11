
import { Credential } from "../credential";
import { Customer } from "../customer";
import { Reservation } from "../reservation";

export class CustomerReservationResponse {
  
  constructor(
    public customer: Customer,
    public credential: Credential,
    public reservations: Reservation[]) {
  }
  
  
  
}













