
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { Rating } from 'src/app/model/rating';
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
  public ratings: Rating[] = [];
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
      next: (ratingPayload: any) => {
        this.ratings = ratingPayload?.responseBody?.ratings;
        this.ratings.map(r => {
          this.employeeService.findById(r?.employeeId).subscribe({
            next: (employeePayload: any) => {
              
              this.employees.push(employeePayload?.responseBody);
              
            }
          });
        });
      },
      
    });
  }
  
  public calculateEmployeeRatings(employee: Employee): void {
    
  }
  
  
  
}












