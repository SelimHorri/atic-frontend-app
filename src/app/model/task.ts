
export class Task {
  
  constructor(
    public workerId: number,
    public reservationId: number,
    public taskDate: Date | string,
    public startDate: Date | string,
    public endDate: Date | string,
    public workerDescription: string,
    public managerDescription: string) {  
  }
  
  
  
}









