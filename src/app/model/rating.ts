
export class Rating {

  constructor(
    public employeeId: number,
    public customerId: number,
    public rateDate: Date | string,
    public rate: string,
    public description: string | null) {
  }



}











