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

}
