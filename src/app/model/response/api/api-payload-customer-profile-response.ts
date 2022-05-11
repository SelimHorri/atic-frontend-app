
import { CustomerProfileResponse } from "../customer-profile-response";

export class ApiPayloadCustomerProfileResponse {

  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: CustomerProfileResponse) {
  }



}











