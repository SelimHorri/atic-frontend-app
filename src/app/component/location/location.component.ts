
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/model/location';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  
  public locationStates: string[] = [];
  
  constructor(private locationService: LocationService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.getAllStates();
  }
  
  public getAllCities(): void {
    
  }
  
  public getAllStates(): void {
    this.locationService.getAllStates().subscribe({
      next: (locationStatesPayload: any) => {
        this.locationStates = locationStatesPayload?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorHandlerService.extractExceptionMsg(errorResponse);
      }
    });
  }
  
  
  
}












