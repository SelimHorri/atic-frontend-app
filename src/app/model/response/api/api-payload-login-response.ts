
import { LoginResponse } from "../login-response";

export class ApiPayloadLoginResponse {
  
  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: LoginResponse) {
    
  }
  
  
  
}








