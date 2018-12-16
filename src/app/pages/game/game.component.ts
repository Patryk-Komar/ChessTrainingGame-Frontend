import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';
import { Quotation } from "../../utils/quotations";
import { PlayerScores } from '../../models/player.scores';
import QuotationManager from "../../managers/quotation.manager";
import Chessboard from '../../models/game/chessboard';
import Move from '../../models/game/move';
import GameMode from '../../models/game/game-modes/game.mode';
import OneMoveCheckmate from '../../models/game/game-modes/one.move.checkmate';
import TwoMovesCheckmate from '../../models/game/game-modes/two.moves.checkmate';
import ThreeMovesCheckmate from '../../models/game/game-modes/three.moves.checkmate';
import Stalemate from '../../models/game/game-modes/stalemate';
import DoubleAttack from '../../models/game/game-modes/double.attack';
import gameModesMapping from "../../config/game.modes.mapping";
import piecesMapping from '../../config/pieces.mapping';

@Component({
  selector: 'game-page',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GamePage implements OnInit {

  private currentSection: string;

  private quotation: Quotation;

  private error: string;

  private chessboard: Chessboard;
  private blockade: boolean;
  private firstClick: boolean;
  private clickedField: number;

  private selectedGameMode: string;
  private rankedGameMode: boolean;
  private gameStarted: boolean;

  private oneMoveCheckmate: OneMoveCheckmate;
  private twoMovesCheckmate: TwoMovesCheckmate;
  private threeMovesCheckmate: ThreeMovesCheckmate;
  private stalemate: Stalemate;
  private doubleAttack: DoubleAttack;
  private random: GameMode;

  private mistakes: number;

  private puzzleStarted: Date;
  private puzzleFinished: Date;

  private playerScores: PlayerScores;
  
  constructor(private userService: UserService, private gameService: GameService, private profileService: ProfileService) {
    this.currentSection = "mode-selection";
    this.gameStarted = false;
    this.startGame = this.startGame.bind(this);
  }

  ngOnInit() {
    this.showPlayerNickname();
    this.showPlayerAvatar();
    this.showPlayerStatistics();
  }

  changeSection(newSection: string): void {
    $("div.main").fadeOut(500);
    setTimeout(() => {
      this.currentSection = newSection;
      $("div.main").fadeIn(500);
    }, 500);
  }

  showPlayerNickname(): void {
    $("span.username").html(this.userService.getUsername());
  }

  showPlayerAvatar(): void {
    this.profileService.getPlayerAvatar()
    .then(response => {
      if (response.success) {
        const {
          path
        } = response;
        $("img.profile-image").attr("src", path);
      } else {
        $("img.profile-image").attr("src", "../../../assets/shared/default-avatar.png");
      }
    });
  }

  showPlayerStatistics(): void {
    this.profileService.getPlayerScores()
    .then(response => {
      const {
        success
      } = response;
      if (success) {
        this.playerScores = new PlayerScores(response);
        const {
          oneMoveCheckmate,
          twoMovesCheckmate
        } = response.scores;
        if (oneMoveCheckmate.completed < 50) {
          $("span#mate-in-two-selection").addClass("blocked");
        }
        if (twoMovesCheckmate.completed < 25) {
          $("span#mate-in-three-selection").addClass("blocked");
        }
      }
    });
  }

  startPuzzleSelection(mode: string): void {
    if (mode === "ranked") {
      this.rankedGameMode = true;
    } else {
      this.rankedGameMode = false;
    }
    this.changeSection("puzzle-selection");
  }

  chessboardFieldClick(fieldNumber): void {
    const {
      blockade,
      chessboard,
      clickedField,
      firstClick,
      selectedGameMode
    } = this;
    if (!blockade) {
      if (firstClick) {
        if (fieldNumber === clickedField) {
          $(`#field-${clickedField}`).removeClass("clicked");
          this.firstClick = false;
          $("div.chessboard-field").removeClass("highlighted");
          this.activateBlockade();
        } else {
          const possibleMoves = chessboard.fields[clickedField].showPossibleMoves(clickedField, chessboard.fields);
          let pieceClone;
          if (chessboard.fields[fieldNumber] !== null) {
            const CloneClass = piecesMapping[chessboard.fields[fieldNumber].getType()];
            pieceClone = new CloneClass(chessboard.fields[fieldNumber].getColor());
          }
          if (possibleMoves.includes(fieldNumber)) {
            chessboard.fields[fieldNumber] = chessboard.fields[clickedField];
            chessboard.fields[clickedField] = null;
            this.firstClick = false;
            $(`#field-${clickedField}`).removeClass("clicked");
            $("div.chessboard-field").removeClass("highlighted");
            if (this[selectedGameMode].validateMove(new Move(clickedField, fieldNumber))) {
              if (this[selectedGameMode].isFinished()) {
                if (this.rankedGameMode) {
                  this.puzzleFinished = new Date();
                  const time = this.puzzleFinished.valueOf() - this.puzzleStarted.valueOf();
                  this.gameService.saveRankedGameResult(selectedGameMode, this[selectedGameMode].getID(), time, this.calculateMistakesPunishment(), this.userService.getUsername());
                  this.playerScores.incrementScore(selectedGameMode);
                }
                this.activateBlockade();
                setTimeout(() => {
                  this.startGame(this.selectedGameMode);
                }, 100);
              } else {
                const enemyMove = this[selectedGameMode].getEnemyMove();
                const enemyMoveFrom = enemyMove.getFrom();
                const enemyMoveTo = enemyMove.getTo();
                setTimeout(() => {
                  chessboard.fields[enemyMoveTo] = chessboard.fields[enemyMoveFrom];
                  chessboard.fields[enemyMoveFrom] = null;
                }, 250);
              }
            } else {
              setTimeout(() => {
                chessboard.fields[clickedField] = chessboard.fields[fieldNumber];
                chessboard.fields[fieldNumber] = pieceClone ? pieceClone : null;
              }, 250);
            }
            this.mistakes = this[selectedGameMode].getMistakesCounter();
            this.activateBlockade();
          }
        }
      } else {
        if (chessboard.fields[fieldNumber] !== null) {
          if (chessboard.fields[fieldNumber].getColor() === this[selectedGameMode].getColor()) {
            $(`#field-${fieldNumber}`).addClass("clicked");
            this.firstClick = true;
            this.clickedField = fieldNumber;
            const possibleMoves = chessboard.fields[fieldNumber].showPossibleMoves(fieldNumber, chessboard.fields);
            for (let move of possibleMoves) {
              $(`#field-${move}`).addClass("highlighted");
            }
            this.activateBlockade();
          }
        }
      }
    }
  }

  activateBlockade(): void {
    this.blockade = true;
    setTimeout(() => {
      this.blockade = false;
    }, 250);
  }

  startGame(selectedGameMode: string): void {
    this.selectedGameMode = selectedGameMode;
    this.blockade = false;
    this.firstClick = false;
    this.mistakes = 0;
    if (!this.gameStarted) {
      this.gameStarted = true;
    }
    if (this.rankedGameMode) {
      setTimeout(() => {
        this.gameService.getRankedGame(selectedGameMode, this.userService.getUsername())
        .then(response => {
          if (response.success) {
            this.showQuotation("game");
            const {
              id,
              color,
              fields,
              solutions
            } = response.result;
            const GameModeClass = gameModesMapping[selectedGameMode];
            this[selectedGameMode] = new GameModeClass(id, fields.split(","), color, solutions);
            this.chessboard = this[selectedGameMode].getChessboard();
            this.puzzleStarted = new Date();
          } else {
            const {
              message
            } = response;
            this.error = message ? message : "Unknown error occurred. Please try again."
            this.showError("puzzle-selection");
          }
        });
      }, 500);
    } else {
      if (selectedGameMode === "random") {
        setTimeout(() => {
          this.gameService.getRandomGame()
          .then(response => {
            if (response.success) {
              this.showQuotation("game");
              const {
                gameModeName,
                result
              } = response;
              const {
                id,
                color,
                fields,
                solutions
              } = result;
              const GameModeClass = gameModesMapping[gameModeName];
              if (gameModeName !== "twoMovesCheckmate" && gameModeName !== "threeMovesCheckmate") {
                this[this.selectedGameMode] = new GameModeClass(id, fields.split(","), color, solutions);
              } else {
                const enemyMoves = result["enemy-moves"];
                this[this.selectedGameMode] = new GameModeClass(id, fields.split(","), color, solutions, enemyMoves)
              }
              setTimeout(() => {
                this.chessboard = this[this.selectedGameMode].getChessboard();
              }, 500);
            } else {
              const {
                message
              } = response;
              this.error = message ? message : "Unknown error occurred. Please try again."
              this.showError("puzzle-selection");
            }
          });
        }, 500);
      } else {
        setTimeout(() => {
          this.gameService.getTrainingGame(this.selectedGameMode)
          .then(response => {
            if (response.success) {
              this.showQuotation("game");
              const {
                gameModeName,
                result
              } = response;
              const {
                id,
                color,
                fields,
                solutions
              } = result;
              this.selectedGameMode = gameModeName;
              const GameModeClass = gameModesMapping[gameModeName];
              if (gameModeName !== "twoMovesCheckmate" && gameModeName !== "threeMovesCheckmate") {
                this[gameModeName] = new GameModeClass(id, fields.split(","), color, solutions);
              } else {
                const enemyMoves = result["enemy-moves"];
                this[gameModeName] = new GameModeClass(id, fields.split(","), color, solutions, enemyMoves)
              }
              setTimeout(() => {
                this.chessboard = this[gameModeName].getChessboard();
              }, 500);
            } else {
              const {
                message
              } = response;
              this.error = message ? message : "Unknown error occurred. Please try again."
              this.showError("puzzle-selection");
            }
          });
        }, 500);
      }
    }
  }

  showQuotation(returnSection: string): void {
    this.quotation = QuotationManager.getInstance().getRandomQuotation();
    this.changeSection("quotation");
    setTimeout(() => {
      this.changeSection(returnSection);
      setTimeout(() => {
        this.puzzleStarted = new Date();
      }, 500);
    }, 2500);
  }

  cancelGame(): void {
    if (this.rankedGameMode) {
      this.changeSection("puzzle-selection");
    } else {
      this.changeSection("puzzle-selection");
    }
  }

  showError(returnSection: string): void {
    this.changeSection("error");
    setTimeout(() => {
      this.changeSection(returnSection);
    }, 3000);
  }

  calculateMistakesPunishment(): number {
    const { selectedGameMode } = this;
    let mistakesPunishment = 0;
    for (let i = 0; i < this[selectedGameMode].getMistakesCounter(); i++) {
      mistakesPunishment += 2 * (i + 1);
    }
    return mistakesPunishment;
  }

}
