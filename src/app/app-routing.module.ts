
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
import { CustomerGuard } from './guard/customer.guard';
import { WorkerGuard } from './guard/worker.guard';
import { ManagerGuard } from './guard/manager.guard';
import { OwnerGuard } from './guard/owner.guard';
import { AuthenticationGuard } from './guard/authentication.guard';
import { RegistrationGuard } from './guard/registration.guard';
import { FavouriteComponent as CustomerFavouriteComponent } from './workspace/customer/favourite/favourite.component';
import { RatingComponent as CustomerRatingComponent } from './workspace/customer/rating/rating.component';
import { ReservationComponent as CustomerReservationComponent } from './workspace/customer/reservation/reservation.component';
import { ReservationDetailsComponent as CustomerReservationDetailsComponent } from './workspace/customer/reservation/reservation-details/reservation-details.component';
import { AssignedWorkerComponent as CustomerAssignedWorkerComponent } from './workspace/customer/reservation/assigned-worker/assigned-worker.component';

const routes: Routes = [
  
  {
    path: "", 
    children: [
      
      { path: "", component: HomeComponent },
      { path: "home", redirectTo: "" },
      { path: "about", component: AboutComponent },
      { path: "contact", component: ContactComponent },
      { path: "logout", component: LogoutComponent },
      { path: "authenticate", component: AuthenticationComponent, canActivate: [AuthenticationGuard] },
      { path: "login", redirectTo: "authenticate" },
      { path: "register", component: RegistrationComponent, canActivate: [RegistrationGuard] },

      {
        path: "workspace/customer",
        canActivateChild: [CustomerGuard],
        children: [
          { path: "", component: CustomerIndexComponent },
          { path: "index", redirectTo: "" },
          { path: "profile", component: CustomerProfileComponent },
          { path: "reservations", component: CustomerReservationComponent },
          { path: "reservations/:reservationId", component: CustomerReservationDetailsComponent },
          { path: "reservations/assigned/:workerId", component: CustomerAssignedWorkerComponent },
          { path: "favourites", component: CustomerFavouriteComponent },
          { path: "ratings", component: CustomerRatingComponent },
        ]
      },
      {
        path: "workspace/worker",
        canActivateChild: [WorkerGuard],
        children: [
          { path: "", component: WorkerIndexComponent },
          { path: "index", redirectTo: "" },
          { path: "profile", component: WorkerProfileComponent },
        ]
      },
      {
        path: "workspace/manager",
        canActivateChild: [WorkerGuard, ManagerGuard],
        children: [
          { path: "", component: ManagerIndexComponent },
          { path: "index", redirectTo: "" },
          { path: "profile", component: ManagerProfileComponent },
        ]
      },
      {
        path: "workspace/owner",
        canActivateChild: [WorkerGuard, ManagerGuard, OwnerGuard],
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
