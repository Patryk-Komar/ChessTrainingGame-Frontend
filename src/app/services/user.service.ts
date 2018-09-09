import { Injectable } from '@angular/core';
import axios from "axios";

import { UserCredentials } from '../models/users/user.credentials';
import { UserRegister } from '../models/users/user.register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  signIn(method:string, userCredentials: UserCredentials) {
    return axios.get(userCredentials.prepareSignInRequestURL(method))
    .then(({ data }: { data: any }) => data);
  }

  checkUsernameAvailability(userRegister: UserRegister) {
    return axios.get(userRegister.prepareUsernameAvailabilityRequestURL())
    .then(({ data }: { data: any }) => data.success);
  }

  checkEmailAvailability(userRegister: UserRegister) {
    return axios.get(userRegister.prepareEmailAvailabilityRequestURL())
    .then(({ data }: { data: any }) => data.success);
  }

  signUp(userRegister: UserRegister) {
    return axios.post(UserRegister.prepareSignUpRequestURL(), userRegister)
    .then(({ data }: { data: any }) => data.success);
  }

}
