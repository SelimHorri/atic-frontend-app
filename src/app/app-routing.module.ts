
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { Error404Component } from './component/error/error404/error404.component';
import { HomeComponent } from './component/home/home.component';
import { RegistrationComponent } from './component/registration/registration.component';

const routes: Routes = [
  
  {
    path: "", 
    children: [
      
      { path: "", component: HomeComponent },
      { path: "authenticate", component: AuthenticationComponent },
      { path: "register", component: RegistrationComponent },
      
    ]
  },
  
  { path: "**", component: Error404Component },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
