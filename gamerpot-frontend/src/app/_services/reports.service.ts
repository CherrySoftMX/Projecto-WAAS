import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  downloadAllCommentsReport() {
    return this.http.get(`${environment.apiUrl}/reports/all-comments`, {
      responseType: 'blob',
    });
  }

  downloadAllUsersReport() {
    return this.http.get(`${environment.apiUrl}/reports/all-users`, {
      responseType: 'blob',
    });
  }
}
