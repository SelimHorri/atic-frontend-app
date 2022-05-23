
import { Customer } from "../../customer";
import { Favourite } from "../../favourite";
import { Rating } from "../../rating";
import { Reservation } from "../../reservation";
import { PageResponse } from "../page/page-response";

export class CustomerProfileResponse {

  constructor(
    public customer: Customer,
    public credential: Credential,
    public reservations?: PageResponse | null,
    public favourites?: PageResponse | null,
    public ratings?: PageResponse | null) {
  }



}











