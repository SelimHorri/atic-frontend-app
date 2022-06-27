
import { Employee } from "../employee";
import { PageResponse } from "./page/page-response";

export class ManagerWorkerInfoResponse {
  
  constructor(public manager: Employee, public subWorkers: PageResponse) {
  }
  
  
  
}













