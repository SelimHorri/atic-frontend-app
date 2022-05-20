
import { Location } from "./location";

export class Saloon {
  
  constructor(
    public id: number,
    public code: string,
    public name: string,
    public isPrimary: boolean,
    public openingDate: Date | string,
    public fullAdr: string,
    public email: string,
    public location: Location) {
  }
  
  
  
}











