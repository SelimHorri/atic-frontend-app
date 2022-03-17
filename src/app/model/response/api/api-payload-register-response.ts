
import { RegisterResponse } from "../register-response";

export class ApiPayloadRegisterResponse {

  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: RegisterResponse) {

  }



}








