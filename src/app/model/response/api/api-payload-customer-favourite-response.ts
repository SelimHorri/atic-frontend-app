
import { CustomerFavouriteResponse } from "../customer-favourite-response";

export class ApiPayloadCustomerFavouriteResponse {
  
  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: CustomerFavouriteResponse) {

  }



}











