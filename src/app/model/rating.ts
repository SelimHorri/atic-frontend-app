
import { Customer } from "./customer";

export class Rating {

  constructor(
    public employeeId: number,
    public customerId: number,
    public rateDate: string,
    public rate: string,
    public description: string,
    public employee: any,
    public customer: Customer) {
  }



}











