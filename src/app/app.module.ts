
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    RegistrationComponent,
    Error404Component,
    NavbarComponent,
    ContactComponent,
    AboutComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
