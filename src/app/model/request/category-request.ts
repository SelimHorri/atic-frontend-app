
export class CategoryRequest {
  
  constructor(
    public categoryId: number, 
    public name: string, 
    public parentCategoryId: number | null | undefined, 
    public saloonId: number) {
  }
  
  
  
}










