import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserRegister } from '../../models/users/user.register';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterPage implements OnInit {

  private currentSection: string;
  private userRegister: UserRegister;

  private maximumUsernameLength = 16;
  private maximumEmailLength = 255;
  private maximumPasswordLength = 20;
  private maximumFirstNameLength = 20;
  private maximumLastNameLength = 20;

  private registerError: string;

  constructor(private userService: UserService) {
    this.currentSection = "pre-rules";
    this.userRegister = new UserRegister();
    this.registerError = "";
    this.validateCredentials = this.validateCredentials.bind(this);
  }

  ngOnInit() {
  }

  changeSection(newSection: string) {
    $("article.main").fadeOut(500);
    setTimeout(() => {
      this.currentSection = newSection;
      $("article.main").fadeIn(500);
    }, 500);
  }

  showHint(option: string): void {
    if (option === "username") {
      alert("Username must contain 3-16 characters and start with a letter.");
    } else if (option === "password") {
      alert("Password must contain 8-20 characters, at least one letter and one digit.");
    } else if (option === "personal") {
      alert("Personal details are used for password reset process.");
    }
  }

  validateCredentials(): void {
    if (!this.userRegister.validateUsername()) {
      this.showError("Please enter the correct username.", "credentials");
      return;
    }
    if (!this.userRegister.validateEmail()) {
      this.showError("Please enter the correct email address.", "credentials");
      return;
    }
    if (!this.userRegister.validatePassword()) {
      this.showError("Please enter the correct password.", "credentials");
      return;
    }
    if (!this.userRegister.validatePasswordsSimilarity()) {
      this.showError("Passwords must be the same.", "credentials");
      return;
    }
    this.userService.checkUsernameAvailability(this.userRegister)
    .then((usernameAvailability: boolean) => {
      if (!usernameAvailability) {
        this.showError("This username is already taken.", "credentials");
        return;
      } else {
        this.userService.checkEmailAvailability(this.userRegister)
        .then((emailAvailability: boolean) => {
          if (!emailAvailability) {
            this.showError("Another account is already registered for this email address.", "credentials");
            return;
          }
          else {
            this.changeSection("personal-details");
          }
        });
      }
    });
  }

  validatePersonalDetails(): void {
    if (!this.userRegister.validateFirstName()) {
      this.showError("Please enter the correct first name.", "personal-details");
      return;
    }
    if (!this.userRegister.validateLastName()) {
      this.showError("Please enter the correct last name.", "personal-details");
      return;
    }
    this.changeSection("regulations");
  }

  validateRegulations(): void {
    if (!this.userRegister.validateRegulations()) {
      this.showError("Please confirm regulations acceptation.", "regulations");
      return;
    }
  }

  showError(error: string, returnSection: string): void {
    this.registerError = error;
    this.changeSection("error");
    setTimeout(() => {
      this.changeSection(returnSection);
      setTimeout(() => {
        this.registerError = "";
      }, 500);
    }, 3000);
  }

  signUp() {
    if (this.userRegister.validate()) {
      this.userService.signUp(this.userRegister)
      .then((success: boolean) => {
        if (success) {
          this.changeSection("registered");
        } else {
          this.showError("Something went wrong. Check register form carefully and try again later.", "pre-rules");
        }
      });
    }
  }

}
