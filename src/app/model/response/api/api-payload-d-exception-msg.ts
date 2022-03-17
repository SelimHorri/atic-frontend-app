
import { ExceptionMsg } from "../../exception-msg";

export class ApiPayloadDExceptionMsg {
  
  public totalResult!: number;
  public httpStatus!: string;
  public acknowledge!: boolean;
  public responseBody!: ExceptionMsg;
  
  constructor(public obj: any) {
    this.totalResult = obj?.totalResult as number;
    this.httpStatus = obj?.httpStatus as string;
    this.acknowledge = obj?.acknowledge as boolean;
    this.responseBody = obj?.responseBody as ExceptionMsg;
  }
  
  
  
}








