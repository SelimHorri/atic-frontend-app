
export class ServiceDetailRequest {
  
  constructor(
    public serviceDetailId: number,
    public name: string,
    public isAvailable: boolean,
    public duration: number,
    public priceUnit: number,
    public description: string | null,
    public categoryId: number) {
  }
  
  
  
}










