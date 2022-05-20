
import { Customer } from "./customer";
import { Saloon } from "./saloon";

export class Favourite {

  constructor(
    public customerId: number,
    public saloonId: number,
    public favouriteDate: Date | string,
    public customer: Customer,
    public saloon: Saloon) {
  }



}











