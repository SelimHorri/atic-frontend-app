
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPayloadDExceptionMsg } from 'src/app/model/response/api/api-payload-d-exception-msg';
import { ApiPayloadTag } from 'src/app/model/response/api/api-payload-tag';
import { Tag } from 'src/app/model/tag';
import { TagService } from 'src/app/service/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public errorMsg!: string;
  public tags!: Tag[];
  
  constructor(private tagService: TagService) {}
  
  ngOnInit(): void {
    this.findAllTags(1);
  }
  
  public onOpenModal(action: string): void {
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    
    if (action === "findAllTagsError")
      button.setAttribute("data-target", "#findAllTagsError");
     
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
        const payload: ApiPayloadDExceptionMsg = new ApiPayloadDExceptionMsg(errorResponse?.error);
        console.log(JSON.stringify(payload));
        this.errorMsg = payload?.responseBody?.errorMsg;
        this.onOpenModal('findAllTagsError');
      }
    });
  }
  
  
  
}













