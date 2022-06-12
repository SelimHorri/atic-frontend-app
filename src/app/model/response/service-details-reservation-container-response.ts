
import { Category } from "../category";
import { PageResponse } from "./page/page-response";

export class ServiceDetailsReservationContainerResponse {
  
  constructor(
    public orderedDetails: PageResponse,
    public serviceDetails: PageResponse,
    public category: Category) {
  }
  
  
  
}












