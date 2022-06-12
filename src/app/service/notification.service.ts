
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrMsg } from '../model/toastr-msg';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(private toastrService: ToastrService) {
  }
  
  public showSuccess(toastrMsg: ToastrMsg) {
    this.toastrService.success(toastrMsg?.message, toastrMsg?.title)
  }
  
  public showError(toastrMsg: ToastrMsg) {
    this.toastrService.error(toastrMsg?.message, toastrMsg?.title)
  }
  
  public showInfo(toastrMsg: ToastrMsg) {
    this.toastrService.info(toastrMsg?.message, toastrMsg?.title)
  }
  
  public showWarning(toastrMsg: ToastrMsg) {
    this.toastrService.warning(toastrMsg?.message, toastrMsg?.title)
  }
  
  
  
}













