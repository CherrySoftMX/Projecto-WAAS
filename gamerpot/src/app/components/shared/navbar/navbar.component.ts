import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomainRoutes } from 'src/app/shared/routes';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  routes = DomainRoutes;
  userSubscription: Subscription;
  user: User | null = null;

  constructor(private router: Router, private authService: AuthService) {
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  onLogin() {
    this.authService.checkIfUserIsLogged();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
