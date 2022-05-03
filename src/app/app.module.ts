
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { AuthenticationService } from './service/authentication.service';
import { RegistrationService } from './service/registration.service';
import { Error404Component } from './component/error/error404/error404.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ContactComponent } from './component/contact/contact.component';
import { AboutComponent } from './component/about/about.component';
import { TagService } from './service/tag.service';
import { IndexComponent } from './workspace/customer/index/index.component';
import { SidebarComponent } from './workspace/customer/sidebar/sidebar.component';
import { TopbarComponent } from './workspace/customer/topbar/topbar.component';
import { ProfileComponent } from './workspace/customer/profile/profile.component';
import { LogoutComponent } from './component/logout/logout.component';
import { CredentialService } from './service/credential.service';
import { ErrorHandlerService } from './service/error-handler.service';
import { CustomerService } from './service/customer.service';
import { FavouriteComponent } from './workspace/customer/favourite/favourite.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    RegistrationComponent,
    Error404Component,
    NavbarComponent,
    ContactComponent,
    AboutComponent,
    IndexComponent,
    SidebarComponent,
    TopbarComponent,
    ProfileComponent,
    LogoutComponent,
    FavouriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthenticationService,
    RegistrationService,
    TagService,
    CredentialService,
    CustomerService,
    ErrorHandlerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
