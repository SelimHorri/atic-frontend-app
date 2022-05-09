
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  
  constructor(private customerService: CustomerService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    
  }
  
  
  
}











