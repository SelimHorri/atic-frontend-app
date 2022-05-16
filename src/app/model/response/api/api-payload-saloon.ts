
import { Saloon } from "../../saloon";

export class ApiPayloadSaloon {
  
  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: Saloon) {
  }
  
  
  
}














