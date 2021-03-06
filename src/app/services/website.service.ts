import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor() { }

  getPresentationStatistics() {
    return axios.get("/api/statistics/presentation")
    .then(({ data }: { data: any }) => data);
  }

  getAllThematicArticles() {
    return axios.get("api/articles/all")
    .then(({ data }: { data: any }) => data);
  }

  getAllGuides() {
    return axios.get("api/guides/all")
    .then(({ data }: { data: any }) => data);
  }

}
