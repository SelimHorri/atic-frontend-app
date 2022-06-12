
export class ReservationRequest {
  
  constructor(
    public username: string = `${sessionStorage.getItem(`username`)}`.trim(),
    public saloonId: number = 0,
    public startDate: Date | string = '',
    public serviceDetailsIds: number[] = [],
    public description?: string | undefined) {
  }
  
  
  
}













