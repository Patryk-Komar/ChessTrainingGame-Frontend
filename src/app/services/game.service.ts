import { Injectable } from '@angular/core';
import axios from "axios";

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private userService: UserService) { }

  isGameModeUnlocked(gameMode: string, username: string) {
    const requestBody = {
      gameMode: gameMode,
      username: username
    };
    return axios.post("/api/game/puzzles/unlocked", requestBody)
    .then(({ data }: { data: any }) => data.success);
  }

  isGameModeUncompleted(gameMode: string, username: string) {
    const requestBody = {
      gameMode: gameMode,
      username: username
    };
    return axios.post("/api/game/puzzles/ranked/completed", requestBody)
    .then(({ data }: { data: any }) => data.success);
  }
  

  getRankedGame(gameMode: string, username: string) {
    return this.isGameModeUnlocked(gameMode, username)
    .then(isUnlocked => {
      if (isUnlocked) {
        return this.isGameModeUncompleted(gameMode, username)
        .then(isUncompleted => {
          if (isUncompleted) {
            const requestBody = {
              gameMode: gameMode,
              username: username
            }
            return axios.post("/api/game/puzzles/ranked/get", requestBody)
            .then(({ data }: { data: any }) => data);
          } else {
            return {
              message: "This game mode is already completed. Now you can use only training mode.",
              success: false
            };
          }
        })
      } else {
        return {
          message: "You haven't unlocked this game mode yet. First you have to complete another puzzles.",
          success: false
        };
      }
    });
  }

  saveRankedGameResult(gameMode: string, id: number, time: number, mistakes: number, username: string) {
    const requestBody = {
      gameMode: gameMode,
      puzzleID: id,
      time: time,
      mistakes: mistakes,
      username: username
    }
    return axios.put("/api/game/puzzles/ranked/update", requestBody)
    .then(({ data }: { data: any }) => data);
  }

  getTrainingGame(gameMode: string) {
    const requestBody = {
      gameMode: gameMode
    };
    return axios.post("/api/game/puzzles/non-ranked/get", requestBody)
    .then(({ data }: { data: any }) => data);
  }

  getRandomGame() {
    const requestBody = {
      random: true
    };
    return axios.post("/api/game/puzzles/non-ranked/get", requestBody)
    .then(({ data }: { data: any }) => data);
  }

}
