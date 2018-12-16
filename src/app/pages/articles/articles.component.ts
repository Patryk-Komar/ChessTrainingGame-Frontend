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
      if (newSection === "article") {
        setTimeout(() => {
          $("article.article-content").fadeOut(1);
          $("div.article-back-button").fadeOut(1);
          $("article.article-content").html(this.selectedArticle.getContent().replace(/<p>/g, "<p style='text-indent: 50px;'>") + "Source: https://en.wikipedia.org");
          $("article.article-content").fadeIn(100);
          $("div.article-back-button").fadeIn(100);
        }, 100);
      }
      $("main").fadeIn(500);
    }, 500);
  }

  showArticle(articleTitle: string): void {
    this.selectedArticle = this.articlesManager.getArticleByTitle(articleTitle);
    this.changeSection("article");
  }

}
