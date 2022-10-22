
import { SafeHtml } from "@angular/platform-browser";
import { Location } from "./location";

export class Saloon {
  
  constructor(
    public id: number,
    public identifier: string,
    public code: string,
    public name: string,
    public isPrimary: boolean,
    public openingDate: Date | string,
    public fullAdr: string,
    public iframeGoogleMap: string | SafeHtml,
    public email: string,
    public location: Location) {
  }
  
  
  
}











