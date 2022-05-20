
import { Customer } from "./customer";
import { Employee } from "./employee";
import { UserRating } from "./user-rating";

export class Rating {

  constructor(
    public workerId: number,
    public customerId: number,
    public rateDate: Date | string,
    public rate: UserRating | number | string,
    public description: string | null,
    public worker: Employee,
    public customer: Customer) {
  }



}











