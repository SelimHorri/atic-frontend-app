
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { ContactComponent } from './component/contact/contact.component';
import { Error404Component } from './component/error/error404/error404.component';
import { HomeComponent } from './component/home/home.component';
import { LogoutComponent } from './component/logout/logout.component';
import { RegistrationComponent } from './component/registration/registration.component';

import { IndexComponent as CustomerIndexComponent } from './workspace/customer/index/index.component';
import { ProfileComponent as CustomerProfileComponent } from './workspace/customer/profile/profile.component';

import { IndexComponent as WorkerIndexComponent } from './workspace/worker/index/index.component';
import { ProfileComponent as WorkerProfileComponent } from './workspace/worker/profile/profile.component';

import { IndexComponent as ManagerIndexComponent } from './workspace/manager/index/index.component';
import { ProfileComponent as ManagerProfileComponent } from './workspace/manager/profile/profile.component';

import { IndexComponent as OwnerIndexComponent } from './workspace/owner/index/index.component';
import { ProfileComponent as OwnerProfileComponent } from './workspace/owner/profile/profile.component';

const routes: Routes = [
  
  {
    path: "", 
    children: [
      
      { path: "", component: HomeComponent },
      { path: "home", redirectTo: "" },
      { path: "about", component: AboutComponent },
      { path: "contact", component: ContactComponent },
      { path: "logout", component: LogoutComponent },
      { path: "authenticate", component: AuthenticationComponent },
      { path: "register", component: RegistrationComponent },

      {
        path: "workspace/customer",
        children: [
          { path: "", component: CustomerIndexComponent },
          { path: "index", redirectTo: "" },
          { path: "profile", component: CustomerProfileComponent },
        ]
      },
      {
        path: "workspace/worker",
        children: [
          { path: "", component: WorkerIndexComponent },
          { path: "index", redirectTo: "" },
          { path: "profile", component: WorkerProfileComponent },
        ]
      },
      {
        path: "workspace/manager",
        children: [
          { path: "", component: ManagerIndexComponent },
          { path: "index", redirectTo: "" },
          { path: "profile", component: ManagerProfileComponent },
        ]
      },
      {
        path: "workspace/owner",
        children: [
          { path: "", component: OwnerIndexComponent },
          { path: "index", redirectTo: "" },
          { path: "profile", component: OwnerProfileComponent },
        ]
      },

    ]
  },
  
  { path: "**", component: Error404Component },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
