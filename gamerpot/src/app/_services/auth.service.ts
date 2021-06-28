import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DomainRoutes } from '../shared/routes';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || '""')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.getValue();
  }

  login(email: string, password: string, rememberMe?: boolean) {
    return this.httpClient
      .post<User>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        map((user) => {
          this.persistUser(user, rememberMe);
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.httpClient
      .post<User>(`${environment.apiUrl}/register`, { name, email, password })
      .toPromise();
  }

  logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    location.reload();
  }

  checkIfUserIsLogged() {
    if (!this.isUserLogged()) {
      this.router.navigate([DomainRoutes.LOGIN.PATH], {
        queryParams: { returnUrl: this.router.url },
      });
    }
  }

  isUserLogged() {
    return !!this.currentUserValue;
  }

  persistUser(user: User, rememberMe?: boolean) {
    if (rememberMe === true) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
}
