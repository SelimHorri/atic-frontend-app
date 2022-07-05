
import { Employee } from "../employee";
import { PageResponse } from "./page/page-response";

export class ManagerReservationResponse {
  
  constructor(
    public manager: Employee,
    public reservations: PageResponse) {
  }
  
  
  
}













