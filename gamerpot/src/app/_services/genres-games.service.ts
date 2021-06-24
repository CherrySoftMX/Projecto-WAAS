import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY, API_URL } from '../shared/apis/rawg-api';
import { GenreResponse } from '../_models/genre-response';

@Injectable({
  providedIn: 'root',
})
export class GenreGamesService {
  constructor(private http: HttpClient) {}

  fetchGenres(): Promise<GenreResponse> {
    const url = `${API_URL}genres?key=${API_KEY}`;
    return this.http.get<GenreResponse>(url).toPromise();
  }
}
