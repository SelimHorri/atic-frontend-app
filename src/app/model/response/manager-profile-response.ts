
import { Employee } from "../employee";
import { PageResponse } from "./page/page-response";

export class ManagerProfileResponse {
  
  constructor(
    public manager: Employee,
    public workers: PageResponse | null | undefined, 
    public reservations: PageResponse | null | undefined, 
    public saloonTags: PageResponse | null | undefined,
    public categories: PageResponse | null | undefined,
    public serviceDetails: PageResponse | null | undefined) {
  }
  
  
  
}












