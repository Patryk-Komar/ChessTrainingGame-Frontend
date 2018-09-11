import { Injectable } from '@angular/core';
import axios from "axios";

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private userService: UserService) {}

  getRankedGame(gameMode: string, username: string) {
    const requestBody = {
      gameMode: gameMode,
      username: username
    }
    return axios.post("/api/game/ranked/puzzles/get", requestBody)
    .then(({ data }: { data: any }) => data);
  }

  saveRankedGameResult(gameMode: string, id: number, time: number, mistakes: number, username: string) {
    const requestBody = {
      gameMode: gameMode,
      puzzleID: id,
      time: time,
      mistakes: mistakes,
      username: username
    }
    return axios.put("/api/game/ranked/puzzles/update", requestBody)
    .then(({ data }: { data: any }) => data)
    .then(console.log);
  }

  getRandomGame() {
    return axios.post("/api/game/non-ranked/puzzles")
    .then(({ data }: { data: any }) => data);
  }

}
