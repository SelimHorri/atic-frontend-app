
import { Saloon } from "./saloon";

export class Category {
  
  constructor(
    public id: number,
    public name: string,
    public parentCategoryId: number,
    public saloon: Saloon) {
  }
  
  
  
}











