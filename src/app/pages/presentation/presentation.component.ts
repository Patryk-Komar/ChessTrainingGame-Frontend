import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { WebsiteService } from '../../services/website.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationPage implements OnInit {

  private chessPuzzles: number;
  private strategyGuides: number;
  private thematicArticles: number;
  private forumThreads: number;

  private numberChangeStarted: boolean;

  private chessMasters: Array <string>;
  private currentSlide: number;
  private slideshowInterval: any;

  constructor(private websiteService: WebsiteService) {
    this.chessPuzzles = 0;
    this.strategyGuides = 0;
    this.thematicArticles = 0;
    this.forumThreads = 0;
    this.numberChangeStarted = false;
    this.chessMasters = [
      "Bobby Fischer",
      "Garry Kasparov",
      "Fabiano Caruana",
      "Levon Aronian",
      "Magnus Carlsen"
    ];
    this.currentSlide = 0;
  }

  ngOnInit() {
    this.startSlideshow();
    this.addScrollListener();
  }

  startSlideshow(): void {
    this.slideshowInterval = setInterval(() => {
      $(`#dot${this.currentSlide}`).toggleClass("active");
      this.currentSlide = this.currentSlide === this.chessMasters.length - 1 ? 0 : this.currentSlide + 1;
      $(`#dot${this.currentSlide}`).toggleClass("active");
      const chessMaster = this.chessMasters[this.currentSlide].replace(" ", "-").toLowerCase();
      const backgroundImage = `url("../../../assets/pages/presentation/${chessMaster}.jpg")`;
      $("article.slideshow").css("background-image", backgroundImage);
    }, 5000);
  }

  addScrollListener(): void {
    const x = $("article.slideshow").css("width").replace("px", "");
    $("article.slideshow").css("height", `${parseInt(x) * (4 / 5)}px`);
    const component = this;
    this.websiteService.getPresentationStatistics()
    .then(data => {
      let {
        success,
        chessPuzzles,
        strategyGuides,
        thematicArticles,
        forumThreads
      } = data;

      if (!success) {
        chessPuzzles = 500;
        strategyGuides = 20;
        thematicArticles = 100;
        forumThreads = 50;
      }

      $(window).scroll(function(){
        const hT = $('article.stats').offset().top;
        const hH = $('article.stats').outerHeight();
        const wH = $(window).height();
        const wS = $(this).scrollTop();

        if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH) && !component.numberChangeStarted) {
          component.numberChangeStarted = true;
          const chessPuzzlesDifference = chessPuzzles / 200;
          const strategyGuidesDifference = strategyGuides / 200;
          const thematicArticlesDifference = thematicArticles / 200;
          const forumThreadsDifference = forumThreads / 200;
      
          let currentChessPuzzlesNumber = 0;
          let currentStrategyGuidesNumber = 0;
          let currentThematicArticlesNumber = 0;
          let currentForumThreadsNumber = 0;

          const interval = setInterval(() => {
            if (component.chessPuzzles + chessPuzzlesDifference < chessPuzzles) {
              currentChessPuzzlesNumber += chessPuzzlesDifference;
              component.chessPuzzles = Math.floor(currentChessPuzzlesNumber);
              currentStrategyGuidesNumber += strategyGuidesDifference;
              component.strategyGuides = Math.floor(currentStrategyGuidesNumber);
              currentThematicArticlesNumber += thematicArticlesDifference;
              component.thematicArticles = Math.floor(currentThematicArticlesNumber);
              currentForumThreadsNumber += forumThreadsDifference;
              component.forumThreads = Math.floor(currentForumThreadsNumber);
            } else {
              component.chessPuzzles = chessPuzzles;
              component.strategyGuides = strategyGuides;
              component.thematicArticles = thematicArticles;
              component.forumThreads = forumThreads;
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
      const chessMaster = this.chessMasters[slideNumber].replace(" ", "-").toLowerCase();
      const backgroundImage = `url("../../../assets/pages/presentation/${chessMaster}.jpg")`;
      $("article.slideshow").css("background-image", backgroundImage);
      this.startSlideshow();
    }
  }

}
