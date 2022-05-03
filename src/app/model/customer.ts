
import { Credential } from "./credential";

export class Customer {
  
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public birthdate: string,
    public credential: Credential) {
  }
  
  
  
}











