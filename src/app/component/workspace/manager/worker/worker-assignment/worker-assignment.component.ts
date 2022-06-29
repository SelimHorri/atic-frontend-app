
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialService } from 'src/app/service/credential.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-manager-worker-assignment',
  templateUrl: './worker-assignment.component.html',
  styleUrls: ['./worker-assignment.component.scss']
})
export class WorkerAssignmentComponent implements OnInit {
  
  public accountUrl!: string;
  
  constructor(private credentialService: CredentialService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
  }
  
  public searchBy(key: string): void {
    
  }
  
  public onSelectPageSize(size: string): void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        if (q?.offset === undefined || size.trim() === '' || size === undefined || size === null || parseInt(size.trim()) < 1)
          this.router.navigateByUrl(`/workspace/${this.accountUrl}/workers/assignments/${q?.workerId}?offset=1`);
        else
          this.router.navigateByUrl(`${window.location.pathname}?offset=${q?.offset}&size=${size}`);
      }
    });
  }
  
  
  
}











