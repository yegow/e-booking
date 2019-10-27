import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private usersService: UsersService,
    private stateService: StateService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('AuthGuard#canActivate() called.');
      return this.isAuthenticated('/login');
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  isAuthenticated(redirectUrl: string) {
    if (this.stateService.loggedUser) {
      return true;
    }

    // Store attempted url for redirecting
    this.usersService.redirectUrl = redirectUrl;

    this.stateService.changeMessage('You need to log in first');
    // Navigate, with extras
    this.router.navigate([redirectUrl]);
    return false;
  }
}
