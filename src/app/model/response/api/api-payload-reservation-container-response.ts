
import { ReservationContainerResponse } from "../reservation-container-response";

export class ApiPayloadReservationContainerResponse {
  
  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: ReservationContainerResponse) {

  }
  
  
  
}














