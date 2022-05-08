
import { Credential } from "../credential";
import { Customer } from "../customer";
import { Favourite } from "../favourite";

export class CustomerFavouriteResponse {
  
  constructor(
    public customer: Customer,
    public credential: Credential,
    public favourites: Favourite[]) {
  }
  
  
  
}













