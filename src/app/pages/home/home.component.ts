import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserCredentials } from '../../models/user.credentials';
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
    this.userCredentials = new UserCredentials();
    this.changeSection = this.changeSection.bind(this);
    this.updateSignInMethod = this.updateSignInMethod.bind(this);
    this.validateCredentials = this.validateCredentials.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
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
      } else if (message) {
        alert(message);
      } else {
        alert(error);
      }
    });
  }

}
