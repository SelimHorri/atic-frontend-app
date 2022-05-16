
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExceptionMsg } from 'src/app/model/exception-msg';
import { ApiPayloadDExceptionMsg } from 'src/app/model/response/api/api-payload-d-exception-msg';
import { ApiPayloadSaloonList } from 'src/app/model/response/api/api-payload-saloon-list';
import { ApiPayloadTag } from 'src/app/model/response/api/api-payload-tag';
import { Saloon } from 'src/app/model/saloon';
import { Tag } from 'src/app/model/tag';
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
  public tags: Tag[] = [];
  public saloons!: Saloon[];

  constructor(private tagService: TagService,
    private saloonService: SaloonService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.findAllTags(1);
    this.findAllWithOffset(1);
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

  public findAllTags(offset: number): void {
    this.tagService.findAll(offset).subscribe({
      next: (payload: ApiPayloadTag) => {
        this.tags = payload?.responseBody;
        console.log(JSON.stringify(this.tags));
      },
      error: (errorResponse: HttpErrorResponse) => {
        const exceptionMsg: ExceptionMsg = this.errorHandlerService.extractExceptionMsg(errorResponse);
        this.msg = exceptionMsg?.errorMsg;
        // this.onOpenModal('findAllTagsError');
      }
    });
  }
  
  public findAllWithOffset(offset: number): void {
    this.saloonService.findAllWithOffset(offset).subscribe({
      next: (res: ApiPayloadSaloonList) => {
        this.saloons = res?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorHandlerService.extractExceptionMsg(errorResponse);
      }
    });
  }



}










