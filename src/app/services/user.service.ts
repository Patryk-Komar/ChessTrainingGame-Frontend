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
    if (!window.localStorage) {
      this.username = "";
      this.email = "";
      this.password = "";
    } else {
      this.username = localStorage.getItem("username") ? localStorage.getItem("username") : "";
      this.email = localStorage.getItem("email") ? localStorage.getItem("email") : "";
      this.password = localStorage.getItem("password") ? localStorage.getItem("password") : "";
    }
    this.checkLocalStorage = this.checkLocalStorage.bind(this);
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

  public checkLocalStorage() {
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
              this.loggedIn = true;
              this.username = storageUsername;
              this.password = storagePassword;
              signInSuccess = true;
              return success;
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
              this.loggedIn = true;
              this.email = storageEmail;
              this.password = storagePassword;
              signInSuccess = true;
              return success;
            }
          })
        );
      }

      return Promise.all(signInPromises)
      .then(values => {
        if (!signInSuccess) {
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }
        return signInSuccess;
      });
    }
  }

  public signIn(method:string, userCredentials: UserCredentials) {
    const requestBody = {
      [method]: userCredentials.getLogin(),
      password: userCredentials.getPassword()
    };
    return axios.post(userCredentials.prepareSignInRequestURL(method), requestBody)
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
    const requestBody = {
      username: userRegister.getUsername()
    };
    return axios.post(userRegister.prepareUsernameAvailabilityRequestURL(), requestBody)
    .then(({ data }: { data: any }) => data.success);
  }

  public checkEmailAvailability(userRegister: UserRegister) {
    const requestBody = {
      username: userRegister.getEmail()
    };
    return axios.post(userRegister.prepareEmailAvailabilityRequestURL(), requestBody)
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

  public changePassword(email: string, oldPassword: string, newPassword: string) {
    const requestBody = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return axios.post("/api/users/changePassword", requestBody)
    .then(({ data }: { data: any }) => data);
  }

}
