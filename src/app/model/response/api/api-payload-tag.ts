
import { Tag } from "../../tag";

export class ApiPayloadTag {
  
  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: Tag[]) {
    
  }
  
  
  
}









