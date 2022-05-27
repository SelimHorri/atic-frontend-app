
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionMsg } from '../model/exception-msg';
import { ApiPayloadDExceptionMsg } from '../model/response/api/api-payload-d-exception-msg';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  
  constructor(private notificationService: NotificationService) {}
  
  public extractExceptionMsg(errorResponse: HttpErrorResponse): ExceptionMsg {
    const errorPayload: ApiPayloadDExceptionMsg = new ApiPayloadDExceptionMsg(errorResponse?.error);
    console.log(JSON.stringify(errorPayload));
    this.notificationService.showError({message: `${errorPayload?.responseBody?.errorMsg}`, title: "Error!"});
    return errorPayload?.responseBody;
  }
  
  
  
}











