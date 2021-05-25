import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreResponse } from '../interfaces/genre-response';
import { API_KEY, API_URL } from '../shared/api';

@Injectable({
  providedIn: 'root',
})
export class GenreGamesService {
  constructor(private http: HttpClient) {}

  getGenres(): Promise<GenreResponse> {
    const url = `${API_URL}genres?key=${API_KEY}`;
    let promise = new Promise<GenreResponse>((resolve, rejects) => {
      this.http
        .get(url)
        .toPromise()
        .then(
          (response) => {
            resolve(response as GenreResponse);
          },
          (error) => {
            rejects(error);
          }
        );
    });
    return promise;
  }
}
