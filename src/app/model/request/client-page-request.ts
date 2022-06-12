
export class ClientPageRequest {
  
  constructor(
    public offset: number = 1,
    public size: number = 5,
    public sortBy: undefined | string[] = [],
    public sortDirection: undefined | string = "desc") {
  }
  
  
  
}















