
import { Credential } from "../../credential";

export class ApiPayloadCredential {
  
  constructor(public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: Credential) {
    
  }
  
  
  
}








