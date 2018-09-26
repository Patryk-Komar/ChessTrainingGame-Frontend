import { Injectable } from '@angular/core';
import axios from "axios";

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private userService: UserService) { }

  public getPlayerAvatar() {
    const requestBody = {
      username: this.userService.getUsername(),
      password: this.userService.getPassword()
    }
    return axios.post("/api/users/avatar/get", requestBody)
    .then(({ data }: { data: any }) => data);
  }

  public getPlayerScores() {
    const requestBody = {
      username: this.userService.getUsername()
    }
    return axios.post("/api/users/scores", requestBody)
    .then(({ data }: { data: any }) => data);
  }

  public getPlayerSecretKey() {
    const requestBody = {
      username: this.userService.getUsername(),
      password: this.userService.getPassword()
    }
    return axios.post("/api/users/secret", requestBody)
    .then(({ data }: { data: any }) => data);
  }

  public uploadAvatar(avatarFile: FormData) {
    return axios.post("/api/users/avatar/upload", avatarFile)
    .then(({ data }: { data: any }) => data);
  }

}
