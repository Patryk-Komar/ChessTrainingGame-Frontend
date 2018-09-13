import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { Quotation } from "../../utils/quotations";
import QuotationManager from "../../managers/quotation.manager";
import { GameService } from '../../services/game.service';
import Chessboard from '../../models/game/chessboard';
import Move from '../../models/game/move';
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

  private puzzleStarted: Date;
  private puzzleFinished: Date;
  
  constructor(private gameService: GameService) {
    this.currentSection = "mode-selection";
    this.gameStarted = false;
    this.startRankedGame = this.startRankedGame.bind(this);
    this.startTrainingGame = this.startTrainingGame.bind(this);
  }

  ngOnInit() {
  }

  changeSection(newSection: string): void {
    $("div.main").fadeOut(500);
    setTimeout(() => {
      this.currentSection = newSection;
      $("div.main").fadeIn(500);
    }, 500);
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
                  this.activateBlockade();
                  setTimeout(() => {
                    this.gameService.saveRankedGameResult(selectedGameMode, this[selectedGameMode].getID(), time, this[selectedGameMode].getMistakesCounter(), "vastgastga");
                    this.startRankedGame(this.selectedGameMode);
                  }, 500);
                } else {
                  this.activateBlockade();
                  setTimeout(() => {
                    this.startTrainingGame();
                  }, 500);
                }
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

  startRankedGame(selectedGameMode: string): void {
    if (!this.gameStarted) {
      $("aside.aside-left").fadeOut(500);
      $("aside.aside-right").fadeOut(500);
      setTimeout(() => {
        $("main").removeClass("col-lg-4").addClass("col-lg-6");
        $("aside.aside-left").removeClass("col-lg-4").addClass("col-lg-3");
        $("aside.aside-right").removeClass("col-lg-4").addClass("col-lg-3");
        $("aside.aside-left").fadeIn(1000);
        $("aside.aside-right").fadeIn(1000);
      }, 1000);
    }
    this.selectedGameMode = selectedGameMode;
    this.rankedGameMode = true;
    this.gameStarted = true;
    this.blockade = false;
    this.firstClick = false;
    setTimeout(() => {
      this.gameService.getRankedGame(selectedGameMode, "??? username ???")
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
  }

  startTrainingGame(): void {
    if (!this.gameStarted) {
      $("aside.aside-left").fadeOut(500);
      $("aside.aside-right").fadeOut(500);
      setTimeout(() => {
        $("main").removeClass("col-lg-4").addClass("col-lg-6");
        $("aside.aside-left").removeClass("col-lg-4").addClass("col-lg-3");
        $("aside.aside-right").removeClass("col-lg-4").addClass("col-lg-3");
        $("aside.aside-left").fadeIn(1000);
        $("aside.aside-right").fadeIn(1000);
      }, 1000);
    }
    this.rankedGameMode = false;
    this.gameStarted = true;
    this.blockade = false;
    this.firstClick = false;
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

  showQuotation(returnSection: string): void {
    this.quotation = QuotationManager.getInstance().getRandomQuotation();
    this.changeSection("quotation");
    setTimeout(() => {
      this.changeSection(returnSection);
      setTimeout(() => {
        this.puzzleStarted = new Date();
      }, 500);
    }, 5000);
  }

  showError(returnSection: string): void {
    this.changeSection("error");
    setTimeout(() => {
      this.changeSection(returnSection);
    }, 3000);
  }

}
