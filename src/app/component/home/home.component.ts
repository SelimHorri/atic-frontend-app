
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExceptionMsg } from 'src/app/model/exception-msg';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { SaloonService } from 'src/app/service/saloon.service';
import { TagService } from 'src/app/service/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public msg!: string;
  public tags!: PageResponse;
  public saloons!: PageResponse;

  constructor(private tagService: TagService,
    private saloonService: SaloonService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.findAllTags();
    this.findAllSaloons();
  }

  public onOpenModal(action: string): void {
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");

    if (action === "findAllTagsError")
      button.setAttribute("data-bs-target", "#findAllTagsError");

    const mainContainer = document.getElementById("main-container");
    mainContainer?.appendChild(button);
    button.click();
  }

  public findAllTags(): void {
    this.tagService.findAll(new ClientPageRequest()).subscribe({
      next: (payload: any) => {
        this.tags = payload?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) => {
        const exceptionMsg: ExceptionMsg = this.errorHandlerService.extractExceptionMsg(errorResponse);
        this.msg = exceptionMsg?.errorMsg;
        // this.onOpenModal('findAllTagsError');
      }
    });
  }
  
  public findAllSaloons(): void {
    this.saloonService.findAll(new ClientPageRequest()).subscribe({
      next: (res: any) => {
        this.saloons = res?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorHandlerService.extractExceptionMsg(errorResponse);
      }
    });
  }



}










