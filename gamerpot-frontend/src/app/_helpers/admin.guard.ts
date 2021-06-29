import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DomainRoutes } from '../shared/routes';
import { UserRole } from '../_models/user-role';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;

    if (
      this.authService.isUserLoggedIn() &&
      currentUser?.role === UserRole.ADMIN
    )
      return true;

    this.router.navigate([DomainRoutes.HOME.PATH]);

    return false;
  }
}
