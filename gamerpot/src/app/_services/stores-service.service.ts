import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STORES_END_POINT } from '../shared/apis/cheap-shark-api';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  constructor(private http: HttpClient) {}

  fetchStores() {
    return this.http.get<any>(STORES_END_POINT).toPromise();
  }
}
