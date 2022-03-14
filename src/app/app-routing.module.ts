
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { HomeComponent } from './component/home/home.component';
import { RegistrationComponent } from './component/registration/registration.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "authenticate", component: AuthenticationComponent },
  { path: "register", component: RegistrationComponent },
  
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
