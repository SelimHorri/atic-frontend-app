
import { Credential } from "./credential";
import { Saloon } from "./saloon";
import { UserImage } from "./user-image";

export class Employee {
  
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public birthdate: Date | string,
    public hiredate: Date | string,
    public credential: Credential,
    public manager: Employee,
    public userImage: UserImage,
    public saloon: Saloon) {
  }
  
  
  
}









