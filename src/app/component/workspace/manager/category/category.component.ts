
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { ToastrMsg } from 'src/app/model/toastr-msg';
import { CredentialService } from 'src/app/service/credential.service';
import { ManagerCategoryService } from 'src/app/service/employee/manager/manager-category.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-manager-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  
  public accountUrl!: string;
  public categories!: PageResponse;
  
  constructor(private credentialService: CredentialService,
    private managerCategoryService: ManagerCategoryService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getAll();
  }
  
  private getAll(): void {
    this.managerCategoryService.getAll().subscribe({
      next: (payload: any) => {
        this.categories = payload?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onUpdate(category: Category): void {
    
  }
  
  public onDelete(categoryId: number): void {
    if (confirm(`Deleting category will delete all sub services!\nDo you confirm deletion ?`))
      this.managerCategoryService.deleteCategory(categoryId).subscribe({
        next: (payload: any) => {
          if (payload?.responseBody && payload?.responseBody === false)
            this.notificationService.showInfo(new ToastrMsg(`Not able to delete this category`, `Not Successfull!`));
          else {
            this.getAll();
            this.notificationService.showSuccess(new ToastrMsg(`Category has been deleted successfully..`, `Removed!`));
          }
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.errorHandlerService.extractExceptionMsg(errorResponse)
      });
  }
  
  public onOpenModal(action: string): void {
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");

    if (action === "updateCategory")
      button.setAttribute("data-bs-target", "#updateCategory");

    const mainContainer = document.getElementById("main-container");
    mainContainer?.appendChild(button);
    button.click();
  }
  
  public searchBy(key: string): void {
    const res: Category[] = [];
    this.categories?.content.forEach((c: Category) => {
      if (c?.name?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1
          // || c?.parentCategory?.name?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1
          || c?.saloon?.name?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1
          || c?.saloon?.code?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1)
        res.push(c);
    });
    this.categories.content = res;
    if (!key)
      this.getAll();
  }
  
  
  
}











