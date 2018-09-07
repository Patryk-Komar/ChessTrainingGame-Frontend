import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Logo } from './components/logo/logo.component';
import { LandingPage } from './pages/landing/landing.component';
import { HomePage } from './pages/home/home.component';
import { UserService } from './services/user.service';
import { RegisterPage } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    Logo,
    LandingPage,
    HomePage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
