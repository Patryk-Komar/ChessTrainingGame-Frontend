import { Injectable } from '@angular/core';
import axios from "axios";

import { UserCredentials } from '../models/users/user.credentials';
import { UserRegister } from '../models/users/user.register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string;
  private email: string;
  private password: string;

  private loggedIn: boolean;

  constructor() {
    this.username = "";
    this.email = "";
    this.password = "";
    this.loggedIn = false;
    this.checkLocalStorage = this.checkLocalStorage.bind(this);
    this.checkLocalStorage();
  }

  public getUsername(): string {
    return this.username;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getLoggedIn(): boolean {
    return this.loggedIn;
  }

  public setLoggedIn(success: boolean): void {
    this.loggedIn = success;
  }

  private checkLocalStorage(): void {
    if (window.localStorage) {

      const storageUsername = localStorage.getItem("username");
      const storageEmail = localStorage.getItem("email");
      const storagePassword = localStorage.getItem("password");

      const signInPromises = [];

      let signInSuccess = false;

      if (storageUsername !== null && storagePassword !== null) {
        signInPromises.push(
          this.signIn("username", new UserCredentials(storageUsername, storagePassword))
          .then(data => data.success)
          .then(success => {
            if (success) {
              this.username = storageUsername;
              this.password = storagePassword;
              signInSuccess = true;
            }
          })
        );
      }

      if (storageEmail !== null && storagePassword !== null) {
        signInPromises.push(
          this.signIn("email", new UserCredentials(storageEmail, storagePassword))
          .then(data => data.success)
          .then(success => {
            if (success) {
              this.email = storageEmail;
              this.password = storagePassword;
              signInSuccess = true;
            }
          })
        );
      }

      Promise.all(signInPromises)
      .then(values => {
        if (!signInSuccess) {
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }
      });
    }
  }

  public signIn(method:string, userCredentials: UserCredentials) {
    return axios.get(userCredentials.prepareSignInRequestURL(method))
    .then(({ data }: { data: any }) => data)
    .then(data => {
      if (data.success && window.localStorage) {
        localStorage.setItem(method, userCredentials.getLogin());
        localStorage.setItem("password", userCredentials.getPassword());
      }
      return data;
    });
  }

  public checkUsernameAvailability(userRegister: UserRegister) {
    return axios.get(userRegister.prepareUsernameAvailabilityRequestURL())
    .then(({ data }: { data: any }) => data.success);
  }

  public checkEmailAvailability(userRegister: UserRegister) {
    return axios.get(userRegister.prepareEmailAvailabilityRequestURL())
    .then(({ data }: { data: any }) => data.success);
  }

  public signUp(userRegister: UserRegister) {
    return axios.post(UserRegister.prepareSignUpRequestURL(), userRegister)
    .then(({ data }: { data: any }) => data.success)
    .then(success => {
      if (success && window.localStorage) {
        localStorage.setItem("username", userRegister.getUsername());
        localStorage.setItem("email", userRegister.getEmail());
        localStorage.setItem("password", userRegister.getPassword());
      }
      return success;
    });
  }

}
