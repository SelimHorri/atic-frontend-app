
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './service/error-handler.service';
import { HealthLivenessService } from './service/health-liveness.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  private HEALTH: string = "health";
  public msg!: string;
  
  constructor(private healthLivenessService: HealthLivenessService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.checkBackendHealth();
  }
  
  public checkBackendHealth(): void {
    this.healthLivenessService.checkBackendHealth().subscribe({
      next: (healthPayload: any) => {
        if (healthPayload?.responseBody?.status === null || healthPayload?.responseBody?.status !== "UP")
          this.onOpenModal(this.HEALTH);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorHandlerService.extractExceptionMsg(errorResponse);
        this.onOpenModal(this.HEALTH);
      }
    });
  }
  
  public onOpenModal(action: string): void {
    this.healthLivenessService.onOpenModal(action);
  }
  
  
  
}













