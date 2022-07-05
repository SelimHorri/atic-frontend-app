
import { Saloon } from "./saloon";

export class Category {
  
  constructor(
    public id: number,
    public name: string,
    public parentCategory: Category | null | undefined,
    public saloon: Saloon) {
  }
  
  
  
}











