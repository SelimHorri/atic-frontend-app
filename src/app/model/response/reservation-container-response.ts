
import { Customer } from "../customer";
import { OrderedDetail } from "../ordered-detail";
import { Reservation } from "../reservation";
import { Task } from "../task";

export class ReservationContainerResponse {
  
  constructor(
    public reservation: Reservation,
    public customer: Customer,
    public orderedDetails: OrderedDetail[] | null,
    public tasks: Task[]) {
  }
  
}













