import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPage } from './pages/landing/landing.component';
import { HomePage } from './pages/home/home.component';
import { RegisterPage } from './pages/register/register.component';
import { GamePage } from './pages/game/game.component';

const routes: Routes = [
  { path: "", component: LandingPage },
  { path: "home", component: HomePage },
  { path: "register", component: RegisterPage },
  { path: "game", component: GamePage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
