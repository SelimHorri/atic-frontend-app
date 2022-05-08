
import { Task } from "../../task";

export class ApiPayloadTaskList {

  constructor(
    public totalResult: number,
    public httpStatus: string,
    public acknowledge: boolean,
    public responseBody: Task[]) {

  }



}









