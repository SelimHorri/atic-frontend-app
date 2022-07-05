
export class TaskUpdateDescriptionRequest {
  
  constructor(
    public username: string,
    public reservationId: number,
    public workerDescription?: string | null | undefined,
    public managerDescription?: string | null | undefined) {
  }
  
  
  
}













