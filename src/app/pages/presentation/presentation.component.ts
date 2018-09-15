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

  constructor(private websiteService: WebsiteService) {
    this.chessPuzzles = 0;
    this.strategyGuides = 0;
    this.thematicArticles = 0;
    this.forumThreads = 0;
    this.numberChangeStarted = false;
  }

  ngOnInit() {
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

}
