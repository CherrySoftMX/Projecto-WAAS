import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY, API_URL } from '../shared/apis/rawg-api';
import { PlatformResponse } from '../_models/platform-response';

@Injectable({
  providedIn: 'root',
})
export class PlatformsGamesService {
  constructor(private http: HttpClient) {}

  getPlatforms() {
    const url = `${API_URL}platforms?key=${API_KEY}`;
    return this.http.get<PlatformResponse>(url).toPromise();
  }
}
