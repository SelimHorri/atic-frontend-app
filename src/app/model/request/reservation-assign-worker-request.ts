
export class ReservationAssignWorkerRequest {
  
  constructor(
    public reservationId: number,
    public assignedWorkersIds: number[],
    public managerDescription?: string | null | undefined) {
  }
  
  
  
}











