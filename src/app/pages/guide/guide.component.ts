import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import GuidesManager from '../../managers/guides.manager';
import Guide from "../../utils/guide";

@Component({
  selector: 'guide-page',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuidePage implements OnInit {

  private currentSection: string;

  private guidesManager: GuidesManager;
  private selectedGuide: Guide;

  constructor() { }

  ngOnInit() {
    this.currentSection = "guideSelection";
    this.guidesManager = GuidesManager.getInstance();
  }

  changeSection(newSection: string): void {
    $("main").fadeOut(500);
    setTimeout(() => {
      this.currentSection = newSection;
      $("main").fadeIn(500);
    }, 500);
  }

  showGuide(guideTitle: string): void {
    this.selectedGuide = this.guidesManager.getGuideByTitle(guideTitle);
    this.changeSection("guideContent");
  }

}
