import { Injectable } from '@angular/core';
import axios from "axios";

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private userService: UserService) { }

  getPlayerAvatar() {
    const requestBody = {
      username: this.userService.getUsername(),
      password: this.userService.getPassword()
    }
    return axios.post("/api/users/avatar/get", requestBody)
    .then(({ data }: { data: any }) => data);
  }

  getPlayerScores() {
    const requestBody = {
      username: this.userService.getUsername()
    }
    return axios.post("/api/users/scores", requestBody)
    .then(({ data }: { data: any }) => data);
  }

}
