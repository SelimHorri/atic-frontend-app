
import { Reservation } from "./reservation";
import { ServiceDetail } from "./service-detail";

export class OrderedDetail {
  
  constructor(
    public reservationId: number,
    public serviceDetailId: number,
    public orderedDate: Date | string,
    public reservation: Reservation,
    public serviceDetail: ServiceDetail) {
  }
  
  
  
}










