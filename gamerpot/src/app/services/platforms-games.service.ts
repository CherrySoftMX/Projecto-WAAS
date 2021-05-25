import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { PlatformResponse } from '../interfaces/platform-response';
import { API_KEY, API_URL } from '../shared/api';

@Injectable({
  providedIn: 'root'
})
export class PlatformsGamesService {

  constructor(private http: HttpClient) {}

  getPlatforms():Promise<PlatformResponse>{
    const url = `${API_URL}platforms?key=${API_KEY}`;
    let promise = new Promise<PlatformResponse>((resolve, rejects)=>{
        this.http.get(url).toPromise().then((response)=>{
            resolve(response as PlatformResponse);
        }, (error)=>{
            rejects(error);
        })
    });
    return promise;
  }
}
