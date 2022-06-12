
import { Customer } from "../customer";
import { OrderedDetail } from "../ordered-detail";
import { Reservation } from "../reservation";
import { Task } from "../task";
import { PageResponse } from "./page/page-response";

export class ReservationContainerResponse {
  
  constructor(
    public reservation: Reservation,
    public customer: Customer,
    public orderedDetails: PageResponse | null,
    public tasks: Task[]) {
  }
  
}













