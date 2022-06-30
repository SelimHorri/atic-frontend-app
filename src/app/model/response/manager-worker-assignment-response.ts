
import { Employee } from "../employee";
import { PageResponse } from "./page/page-response";

export class ManagerWorkerAssignmentResponse {
  
  constructor(public manager: Employee, public tasks: PageResponse) {
  }
  
  
  
}












