
import { Reservation } from "../../reservation";

export class ApiPayloadReservation {
  
  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: Reservation) {

  }
  
  
  
}











