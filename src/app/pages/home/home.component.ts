import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserCredentials } from '../../models/users/user.credentials';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage implements OnInit {

  private currentSection: string;
  private signInMethod: string;
  private userCredentials: UserCredentials;

  private maximumUsernameLength = 16;
  private maximumEmailLength = 255;
  private maximumPasswordLength = 20;

  constructor(private userService: UserService) {
    this.currentSection = "home";
    this.signInMethod = "username";
    this.changeSection = this.changeSection.bind(this);
    this.updateSignInMethod = this.updateSignInMethod.bind(this);
    this.validateCredentials = this.validateCredentials.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  ngOnInit() {
    setTimeout(() => {
      this.userCredentials = new UserCredentials(this.userService.getUsername(), this.userService.getPassword());
    }, 500);
  }

  changeSection(newSection: string) {
    $("div.main").fadeOut(500);
    setTimeout(() => {
      this.currentSection = newSection;
      $("div.main").fadeIn(500);
    }, 500);
  }

  updateSignInMethod(method: string) {
    if (method !== this.signInMethod) {
      this.signInMethod = method;
      this.userCredentials = method === "username" ?
        new UserCredentials(this.userService.getUsername(), this.userService.getPassword()) :
        new UserCredentials(this.userService.getEmail(), this.userService.getPassword());
      $("img.sign-in-method ").toggleClass("active").toggleClass("inactive");
    }
  }

  validateCredentials(): boolean {
    if (this.signInMethod === "username") {
      return this.userCredentials.validateUsername() && this.userCredentials.validatePassword();
    } else {
      return this.userCredentials.validateEmail() && this.userCredentials.validatePassword();
    }
  }

  signIn() {
    this.userService.signIn(this.signInMethod, this.userCredentials)
    .then(response => {
      const {
        error,
        message,
        success
      } = response;
      if (success) {
        this.changeSection("loggedIn");
        this.userService.setLoggedIn(true);
      } else if (message) {
        alert(message);
      } else if (error) {
        alert(error);
      }
    });
  }

}
