import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SessionQuery } from '../store/session.query';

@Injectable({
  providedIn: 'root'
})
export class RedirectAuthenticatedGuard implements CanActivate, CanLoad {
  constructor(
    private sessionQuery: SessionQuery,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated('/dash');
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  isAuthenticated(redirectUrl?: string) {
    const isAuthenticatedUser = !!this.sessionQuery.getValue().token;
    if (isAuthenticatedUser) {
      this.router.navigate([redirectUrl]);
    }
    return !isAuthenticatedUser;
  }
}
