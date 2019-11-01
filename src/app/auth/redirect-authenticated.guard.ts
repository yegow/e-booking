import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  isAuthenticated(redirectUrl: string) {
    console.log('Redirect guard called');
    const authenticated = !!this.sessionQuery.getValue().token;
    if (authenticated) {
      this.router.navigate([redirectUrl]);
      return false;
    }

    return true;
  }
}
