
import { Credential } from "../credential";
import { Employee } from "../employee";
import { PageResponse } from "./page/page-response";

export class ManagerProfileResponse {
  
  constructor(
    public manager: Employee,
    public credential: Credential,
    public reservations: PageResponse | null | undefined, 
    public tags: PageResponse | null | undefined) {
  }
  
  
  
}












