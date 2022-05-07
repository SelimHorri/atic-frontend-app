
import { Saloon } from "../../saloon";

export class ApiPayloadSaloonList {

  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: Saloon[]) {

  }



}









