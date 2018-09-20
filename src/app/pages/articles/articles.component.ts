import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import ArticlesManager from "../../managers/articles.manager";
import Article from '../../utils/article';

@Component({
  selector: 'articles-page',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesPage implements OnInit {

  private currentSection: string;

  private articlesManager: ArticlesManager;
  private selectedArticle: Article;

  private parsedArticle: Array <string>;

  constructor() {
    this.currentSection = "articles-type-selection";
    this.articlesManager = ArticlesManager.getInstance();
  }

  ngOnInit() {
  }

  changeSection(newSection: string): void {
    $("main").fadeOut(500);
    setTimeout(() => {
      this.currentSection = newSection;
      $("main").fadeIn(500);
    }, 500);
  }

  showArticle(articleTitle: string): void {
    this.selectedArticle = this.articlesManager.getArticleByTitle(articleTitle);
    this.parseArticle();
    this.changeSection("article");
  }

  parseArticle(): void {
    this.parsedArticle = this.selectedArticle.getContent().split("|");
  }

}
