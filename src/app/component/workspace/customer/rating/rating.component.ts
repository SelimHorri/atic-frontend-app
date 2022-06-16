
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { CredentialService } from 'src/app/service/credential.service';
import { CustomerService } from 'src/app/service/customer.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-customer-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  
  public accountUrl!: string;
  public ratings!: PageResponse;
  public employees: Employee[] = [];
  
  constructor(private credentialService: CredentialService,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem(`userRole`)}`);
    this.getRatings();
  }
  
  public getRatings(): void {
    this.customerService.getRatings().subscribe({
      next: (customerRatingPayload: any) => {
        this.ratings = customerRatingPayload?.responseBody?.ratings;
        this.ratings?.content.forEach(r => {
          this.employeeService.findById(r?.workerId).subscribe({
            next: (employeePayload: any) => {
              this.employees?.push(employeePayload?.responseBody);
            },
            error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
          });
        });
      },
      
    });
  }
  
  public calculateEmployeeRatings(employee: Employee): void {
    
  }
  
  
  
}












