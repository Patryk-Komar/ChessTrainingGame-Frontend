import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import Chessboard from '../../models/game/chessboard';
import { Quotation } from "../../utils/quotations";
import QuotationManager from "../../managers/quotation.manager";

@Component({
  selector: 'game-page',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GamePage implements OnInit {

  private currentSection: string;

  private chessboard: Chessboard;
  private selectedGameMode: string;
  private firstClick: boolean;
  private clickedField: number;

  private quotation: Quotation;

  private error: string;
  
  constructor() {
    this.currentSection = "mode-selection";
  }

  ngOnInit() {
  }

  changeSection(newSection: string) {
    $("div.main").fadeOut(500);
    setTimeout(() => {
      this.currentSection = newSection;
      $("div.main").fadeIn(500);
    }, 500);
  }

  chessboardFieldClick(fieldNumber) {
      const {
        chessboard,
        clickedField,
        firstClick
    } = this;
    if (firstClick) {
      if (fieldNumber === clickedField) {
        $(`#field-${clickedField}`).removeClass("clicked");
        this.firstClick = false;
        $("div.chessboard-field").removeClass("highlighted");
      } else {
        const possibleMoves = chessboard.fields[clickedField].showPossibleMoves(clickedField, chessboard.fields);
        if (possibleMoves.includes(fieldNumber)) {
          chessboard.fields[fieldNumber] = chessboard.fields[clickedField];
          chessboard.fields[clickedField] = null;
          this.firstClick = false;
          $(`#field-${clickedField}`).removeClass("clicked").html("");
          $(`#field-${fieldNumber}`).html(`<img src="${chessboard.fields[fieldNumber].prepareAssetsURL()}" alt="${chessboard.fields[fieldNumber].prepareAlternativeDescription()}" class="chess-piece clickable" style="width: 100%;">`);
          $("div.chessboard-field").removeClass("highlighted");
        }
      }
    } else {
      if (chessboard.fields[fieldNumber] !== null) {
        $(`#field-${fieldNumber}`).addClass("clicked");
        this.firstClick = true;
        this.clickedField = fieldNumber;
        const possibleMoves = chessboard.fields[fieldNumber].showPossibleMoves(fieldNumber, chessboard.fields);
        for (let move of possibleMoves) {
          $(`#field-${move}`).addClass("highlighted");
        }
      }
    }
  }

  startOneMoveCheckmated() {
    this.startGame("oneMoveCheckmates");
  }

  startTwoMovesCheckmates() {
    this.startGame("twoMovesCheckmates");
  }

  startThreeMovesCheckmates() {
    this.startGame("threeMovesCheckmates");
  }

  startStalemates() {
    this.startGame("stalemates");
  }

  startDoubleAttacks() {
    this.startGame("doubleAttacks");
  }

  startGame(mode: string) {
    // To do - check if player can play that mode
    this.selectedGameMode = mode;
    this.firstClick = false;
    this.chessboard = new Chessboard();
    this.showQuotation("game");
  }

  showQuotation(returnSection: string): void {
    this.quotation = QuotationManager.getInstance().getRandomQuotation();
    this.changeSection("quotation");
    setTimeout(() => {
      this.changeSection(returnSection);
    }, 5000);
  }

  showError(returnSection: string): void {
    this.changeSection("error");
    setTimeout(() => {
      this.changeSection(returnSection);
    }, 3000);
  }

}
