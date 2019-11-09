import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ToastService } from '../services/toast.service';
import { SessionQuery } from '../store/session.query';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private toastService: ToastService,
    private sessionQuery: SessionQuery,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.isAuthenticated('/login', 'You need to login first.');
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  isAuthenticated(redirectUrl?: string, message?: string) {
    const isAuthenticatedUser = !!this.sessionQuery.getValue().token;
    if (!isAuthenticatedUser && redirectUrl) {
      this.router.navigate([redirectUrl]);
      this.toastService.showError({
        message
      });
    }
    return isAuthenticatedUser;
  }
}
