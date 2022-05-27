
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(private toastrService: ToastrService) {
  }
  
  public showSuccess(toastrMsg: any) {
    this.toastrService.success(toastrMsg?.message, toastrMsg?.title)
  }
  
  public showError(toastrMsg: any) {
    this.toastrService.error(toastrMsg?.message, toastrMsg?.title)
  }
  
  public showInfo(toastrMsg: any) {
    this.toastrService.info(toastrMsg?.message, toastrMsg?.title)
  }
  
  public showWarning(toastrMsg: any) {
    this.toastrService.warning(toastrMsg?.message, toastrMsg?.title)
  }
  
  
  
}













