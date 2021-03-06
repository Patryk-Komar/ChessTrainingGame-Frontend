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
import { RegisterPage } from './pages/register/register.component';
import { GamePage } from './pages/game/game.component';
import { PresentationPage } from './pages/presentation/presentation.component';
import { ArticlesPage } from './pages/articles/articles.component';
import { ErrorPage } from './pages/error/error.component';
import { AccountPage } from './pages/account/account.component';
import { GuidePage } from './pages/guide/guide.component';
import { RankPage } from './pages/rank/rank.component';

import { UserService } from './services/user.service';
import { GameService } from './services/game.service';
import { WebsiteService } from './services/website.service';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    Logo,
    LandingPage,
    HomePage,
    RegisterPage,
    GamePage,
    PresentationPage,
    ArticlesPage,
    ErrorPage,
    AccountPage,
    GuidePage,
    RankPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    UserService,
    GameService,
    WebsiteService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
