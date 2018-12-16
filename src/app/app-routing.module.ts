import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  { path: "", component: LandingPage },
  { path: "landing", component: LandingPage },
  { path: "home", component: HomePage },
  { path: "register", component: RegisterPage },
  { path: "game", component: GamePage, canActivate: [AuthorizationGuard] },
  { path: "presentation", component: PresentationPage },
  { path: "articles", component: ArticlesPage },
  { path: "error", component: ErrorPage },
  { path: "account", component: AccountPage, canActivate: [AuthorizationGuard] },
  { path: "guide", component: GuidePage },
  { path: "rank", component: RankPage },
  { path: "**", redirectTo: "error" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
