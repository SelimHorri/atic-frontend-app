
import { ServiceDetailsReservationContainerResponse } from "../service-details-reservation-container-response";

export class ApiPayloadServiceDetailsReservationContainerResponse {
  
  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: ServiceDetailsReservationContainerResponse) {

  }



}









