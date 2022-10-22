
import { Saloon } from "./saloon";
import { Tag } from "./tag";

export class SaloonTag {
  
  constructor(
    public saloonId: number,
    public tagId: number,
    public taggedDate: Date | string,
    public identifier: string,
    public saloon: Saloon,
    public tag: Tag) {
  }
  
  
  
}












