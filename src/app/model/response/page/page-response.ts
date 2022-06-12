
import { PageableResponse } from "./pageable-response";
import { SortResponse } from "./sort-response";

export class PageResponse {
  
  constructor(
    public content: any[],
    public pageable: PageableResponse,
    public totalPages: number,
    public totalElements: number,
    public last: boolean,
    public sort: SortResponse,
    public size: number,
    public number: number,
    public first: boolean,
    public numberOfElements: number,
    public empty: boolean) {
  }
  
  
  
}












