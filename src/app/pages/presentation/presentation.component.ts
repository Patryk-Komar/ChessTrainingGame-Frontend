import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { WebsiteService } from '../../services/website.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationPage implements OnInit {

  private activePlayers: number;
  private chessPuzzles: number;
  private strategyGuides: number;
  private thematicArticles: number;

  private numberChangeStarted: boolean;

  private currentSlide: number;
  private slideshowInterval: any;

  private screenshots: Array <string> = [
    "screenshot-1",
    "screenshot-2",
    "screenshot-3",
    "screenshot-4",
    "screenshot-5"
  ];

  constructor(private websiteService: WebsiteService) {
    this.activePlayers = 0;
    this.chessPuzzles = 0;
    this.strategyGuides = 0;
    this.thematicArticles = 0;
    this.numberChangeStarted = false;
    this.currentSlide = 0;
  }

  ngOnInit() {
    this.startSlideshow();
    this.addScrollListener();
  }

  startSlideshow(): void {
    this.slideshowInterval = setInterval(() => {
      $(`#dot${this.currentSlide}`).toggleClass("active");
      this.currentSlide = this.currentSlide === 4 ? 0 : this.currentSlide + 1;
      $(`#dot${this.currentSlide}`).toggleClass("active");
      const backgroundImage = `url("../../../assets/pages/presentation/${this.screenshots[this.currentSlide]}.jpg")`;
      $("article.slideshow").css("background-image", backgroundImage);
    }, 5000);
  }

  addScrollListener(): void {
    const x = $("article.slideshow").css("width").replace("px", "");
    $("article.slideshow").css("height", `${parseInt(x) * (630 / 1110)}px`);
    const component = this;
    this.websiteService.getPresentationStatistics()
    .then(data => {
      let {
        success,
        activePlayers,
        chessPuzzles,
        strategyGuides,
        thematicArticles
      } = data;

      if (!success) {
        activePlayers = 100;
        chessPuzzles = 260;
        strategyGuides = 20;
        thematicArticles = 45;
      }

      $(window).scroll(function(){
        const hT = $('article.stats').offset().top;
        const hH = $('article.stats').outerHeight();
        const wH = $(window).height();
        const wS = $(this).scrollTop();

        if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH) && !component.numberChangeStarted) {
          component.numberChangeStarted = true;
          const activePlayersDifference = activePlayers / 200;
          const chessPuzzlesDifference = chessPuzzles / 200;
          const strategyGuidesDifference = strategyGuides / 200;
          const thematicArticlesDifference = thematicArticles / 200;
      
          let currentActiveUsersNumber = 0;
          let currentChessPuzzlesNumber = 0;
          let currentStrategyGuidesNumber = 0;
          let currentThematicArticlesNumber = 0;

          const interval = setInterval(() => {
            if (component.chessPuzzles + chessPuzzlesDifference < chessPuzzles) {
              currentActiveUsersNumber += activePlayersDifference;
              component.activePlayers = Math.floor(currentActiveUsersNumber);
              currentChessPuzzlesNumber += chessPuzzlesDifference;
              component.chessPuzzles = Math.floor(currentChessPuzzlesNumber);
              currentStrategyGuidesNumber += strategyGuidesDifference;
              component.strategyGuides = Math.floor(currentStrategyGuidesNumber);
              currentThematicArticlesNumber += thematicArticlesDifference;
              component.thematicArticles = Math.floor(currentThematicArticlesNumber);
            } else {
              component.activePlayers = activePlayers;
              component.chessPuzzles = chessPuzzles;
              component.strategyGuides = strategyGuides;
              component.thematicArticles = thematicArticles;
              clearInterval(interval);
            }
          }, 10);
        }
      });
    });
  }

  changeSlide(slideNumber: number): void {
    if (slideNumber === this.currentSlide) {
      return;
    } else {
      clearInterval(this.slideshowInterval);
      $(`#dot${this.currentSlide}`).toggleClass("active");
      this.currentSlide = slideNumber;
      $(`#dot${this.currentSlide}`).toggleClass("active");
      const screenshot = this.screenshots[slideNumber];
      const backgroundImage = `url("../../../assets/pages/presentation/${screenshot}.jpg")`;
      $("article.slideshow").css("background-image", backgroundImage);
      this.startSlideshow();
    }
  }

}
