
import { Category } from "./category";

export class ServiceDetail {
  
  constructor(
    public id: number,
    public identifier: string,
    public name: string,
    public description: string,
    public isAvailable: boolean,
    public duration: number,
    public priceUnit: number,
    public category: Category) {
  }
  
  
  
}










