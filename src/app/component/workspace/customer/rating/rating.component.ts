
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { Rating } from 'src/app/model/rating';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { CredentialService } from 'src/app/service/credential.service';
import { CustomerService } from 'src/app/service/customer.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  
  public accountUrl!: string;
  public ratings!: PageResponse;
  public employees!: PageResponse;
  
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
      next: (ratingPayload: any) => {
        this.ratings = ratingPayload?.responseBody?.ratings;
        this.ratings?.content.forEach(r => {
          this.employeeService.findById(r?.workerId).subscribe({
            next: (employeePayload: any) => {
              
              this.employees?.content.push(employeePayload?.responseBody);
              console.log(JSON.stringify(this.employees.content))
              
            }
          });
        });
      },
      
    });
  }
  
  public calculateEmployeeRatings(employee: Employee): void {
    
  }
  
  
  
}












