
import { Employee } from "./employee";
import { Reservation } from "./reservation";

export class Task {
  
  constructor(
    public workerId: number,
    public reservationId: number,
    public taskDate: Date | string,
    public startDate: Date | string | null | undefined,
    public endDate: Date | string | null | undefined,
    public workerDescription: string | null | undefined,
    public managerDescription: string | null | undefined,
    public worker: Employee,
    public reservation: Reservation) {  
  }
  
  
  
}









