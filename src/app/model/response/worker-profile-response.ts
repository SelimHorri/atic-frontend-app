
import { Credential } from "../credential";
import { Employee } from "../employee";
import { PageResponse } from "./page/page-response";

export class WorkerProfileResponse {
  
  constructor(
    public worker: Employee,
    public credential: Credential,
    public tasks: PageResponse | null | undefined) {
  }
  
  
  
}










