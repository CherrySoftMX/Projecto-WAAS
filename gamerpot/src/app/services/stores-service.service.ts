import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private apiUrl = 'https://www.cheapshark.com/api/1.0/stores';
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

   getStores = async () => {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(this.apiUrl)
        .toPromise()
        .then(
          response => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    return promise;
  }

}
