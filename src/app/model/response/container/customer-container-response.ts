
import { Customer } from "../../customer";
import { Favourite } from "../../favourite";
import { Rating } from "../../rating";
import { Reservation } from "../../reservation";

export class CustomerProfileResponse {

  constructor(
    public customer: Customer,
    public credential: Credential,
    public reservations?: Reservation[] | null,
    public favourites?: Favourite[] | null,
    public ratings?: Rating[] | null) {
  }



}











