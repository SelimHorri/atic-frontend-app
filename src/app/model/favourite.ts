
import { Customer } from "./customer";

export class Favourite {

  constructor(
    public customerId: number,
    public saloonId: number,
    public favouriteDate: string,
    public customer: Customer,
    public saloon: any) {
  }



}











