
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { ContactComponent } from './component/contact/contact.component';
import { Error404Component } from './component/error/error404/error404.component';
import { HomeComponent } from './component/home/home.component';
import { LogoutComponent } from './component/logout/logout.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { IndexComponent as CustomerIndexComponent } from './component/workspace/customer/index/index.component';
import { ProfileComponent as CustomerProfileComponent } from './component/workspace/customer/profile/profile.component';
import { IndexComponent as WorkerIndexComponent } from './component/workspace/worker/index/index.component';
import { ProfileComponent as WorkerProfileComponent } from './component/workspace/worker/profile/profile.component';
import { IndexComponent as ManagerIndexComponent } from './component/workspace/manager/index/index.component';
import { ProfileComponent as ManagerProfileComponent } from './component/workspace/manager/profile/profile.component';
import { IndexComponent as OwnerIndexComponent } from './component/workspace/owner/index/index.component';
import { ProfileComponent as OwnerProfileComponent } from './component/workspace/owner/profile/profile.component';
import { CustomerGuard } from './guard/customer.guard';
import { WorkerGuard } from './guard/worker.guard';
import { ManagerGuard } from './guard/manager.guard';
import { OwnerGuard } from './guard/owner.guard';
import { AuthenticationGuard } from './guard/authentication.guard';
import { RegistrationGuard } from './guard/registration.guard';
import { FavouriteComponent as CustomerFavouriteComponent } from './component/workspace/customer/favourite/favourite.component';
import { RatingComponent as CustomerRatingComponent } from './component/workspace/customer/rating/rating.component';
import { ReservationComponent as CustomerReservationComponent } from './component/workspace/customer/reservation/reservation.component';
import { ReservationDetailsComponent as CustomerReservationDetailsComponent } from './component/workspace/customer/reservation/reservation-details/reservation-details.component';
import { AssignedWorkerComponent as CustomerAssignedWorkerComponent } from './component/workspace/customer/reservation/assigned-worker/assigned-worker.component';
import { SaloonComponent } from './component/saloon/saloon.component';
import { LocationComponent } from './component/location/location.component';
import { SaloonDetailComponent } from './component/saloon/saloon-detail/saloon-detail.component';
import { SaloonCalendarComponent } from './component/saloon/saloon-calendar/saloon-calendar/saloon-calendar.component';
import { SaloonDetailGuard } from './guard/saloon-detail.guard';
import { ReservationComponent as WorkerReservationComponent } from './component/workspace/worker/reservation/reservation.component';
import { ReservationCalendarComponent as WorkerReservationCalendarComponent } from './component/workspace/worker/reservation/reservation-calendar/reservation-calendar.component';
import { ReservationDetailsComponent as WorkerReservationDetailsComponent } from './component/workspace/worker/reservation/reservation-details/reservation-details.component';
import { ReservationComponent as ManagerReservationComponent } from './component/workspace/manager/reservation/reservation.component';
import { ReservationCalendarComponent as ManagerReservationCalendarComponent } from './component/workspace/manager/reservation/reservation-calendar/reservation-calendar.component';
import { ReservationDetailComponent as ManagerReservationDetailComponent } from './component/workspace/manager/reservation/reservation-detail/reservation-detail.component';
import { WorkerComponent as ManagerWorkerComponent } from './component/workspace/manager/worker/worker.component';

const routes: Routes = [
  
  {
    path: "", 
    children: [
      
      { path: "", component: HomeComponent },
      { path: "home", redirectTo: "" },
      { path: "about", component: AboutComponent },
      { path: "contact", component: ContactComponent },
      { path: "locations", component: LocationComponent },
      
      { path: "locations/:state/saloons", component: SaloonComponent },
      
      { path: "saloons", component: SaloonComponent },
      { path: "saloons/:id", component: SaloonDetailComponent, canActivate: [SaloonDetailGuard] },
      { path: "saloons/:id/calendar", component: SaloonCalendarComponent, canActivate: [SaloonDetailGuard] },
      // { path: "saloons/code/:code", component: SaloonComponent, canActivate: [SaloonDetailGuard] },
      
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
          { path: "reservations", component: WorkerReservationComponent },
          { path: "reservations/calendar", component: WorkerReservationCalendarComponent },
          { path: "reservations/:reservationId", component: WorkerReservationDetailsComponent },
        ]
      },
      {
        path: "workspace/manager",
        canActivateChild: [WorkerGuard, ManagerGuard],
        children: [
          { path: "", component: ManagerIndexComponent },
          { path: "index", redirectTo: "" },
          { path: "profile", component: ManagerProfileComponent },
          { path: "reservations", component: ManagerReservationComponent },
          { path: "reservations/calendar", component: ManagerReservationCalendarComponent },
          { path: "reservations/:reservationId", component: ManagerReservationDetailComponent },
          { path: "workers", component: ManagerWorkerComponent },
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
