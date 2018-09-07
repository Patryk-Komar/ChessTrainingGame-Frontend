import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPage } from './pages/landing/landing.component';
import { HomePage } from './pages/home/home.component';
import { RegisterPage } from './pages/register/register.component';

const routes: Routes = [
  { path: "", component: LandingPage },
  { path: "home", component: HomePage },
  { path: "register", component: RegisterPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
