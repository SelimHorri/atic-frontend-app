
import { Category } from "../category";
import { OrderedDetail } from "../ordered-detail";
import { ServiceDetail } from "../service-detail";

export class ServiceDetailsReservationContainerResponse {
  
  constructor(
    public orderedDetails: OrderedDetail[],
    public serviceDetails: ServiceDetail[],
    public category: Category) {
  }
  
  
  
}












