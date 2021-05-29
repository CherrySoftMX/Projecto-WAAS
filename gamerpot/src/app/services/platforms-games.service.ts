import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlatformResponse } from '../interfaces/platform-response';
import { API_KEY, API_URL } from '../shared/apis/rawg-api';

@Injectable({
  providedIn: 'root',
})
export class PlatformsGamesService {
  constructor(private http: HttpClient) {}

  getPlatforms(): Promise<PlatformResponse> {
    const url = `${API_URL}platforms?key=${API_KEY}`;
    return this.http.get<PlatformResponse>(url).toPromise();
  }
}
