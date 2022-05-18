
import { UserRating } from "./user-rating";

export class Rating {

  constructor(
    public employeeId: number,
    public customerId: number,
    public rateDate: Date | string,
    public rate: UserRating | number | string,
    public description: string | null) {
  }



}











