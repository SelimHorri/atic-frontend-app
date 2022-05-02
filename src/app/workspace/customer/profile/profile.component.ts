
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPayloadDExceptionMsg } from 'src/app/model/response/api/api-payload-d-exception-msg';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  constructor(private customerService: CustomerService) {}
  
  ngOnInit(): void {
    
  }
  
  public findByUsername(username: string): void {
    this.customerService.findByUsername(username).subscribe({
      next: (responsePayload: any) => {
        
      },
      error: (errorResponse: HttpErrorResponse) => {
        const errorCredentialPayload: ApiPayloadDExceptionMsg = new ApiPayloadDExceptionMsg(errorResponse?.error);
        console.log(JSON.stringify(errorCredentialPayload));
      }
    });
  }
  
  
  
}










