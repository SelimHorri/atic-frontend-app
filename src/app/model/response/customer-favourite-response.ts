
import { Credential } from "../credential";
import { Customer } from "../customer";
import { Favourite } from "../favourite";
import { PageResponse } from "./page/page-response";

export class CustomerFavouriteResponse {
  
  constructor(
    public customer: Customer,
    public credential: Credential,
    public favourites: PageResponse) {
  }
  
  
  
}













