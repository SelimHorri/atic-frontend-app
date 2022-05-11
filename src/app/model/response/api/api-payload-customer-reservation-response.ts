
import { CustomerReservationResponse } from "../customer-reservation-response";

export class ApiPayloadCustomerReservationResponse {

  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: CustomerReservationResponse) {

  }



}











