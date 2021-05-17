import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  private apiUrl = 'https://www.cheapshark.com/api/1.0/stores';

  constructor(private http: HttpClient) {}

  getStores = async () => {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(this.apiUrl)
        .toPromise()
        .then(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  };
}
