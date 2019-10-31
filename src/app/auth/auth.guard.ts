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
      const authenticated = this.isAuthenticated('/login');
      return authenticated;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  async isAuthenticated(redirectUrl: string) {
    console.log("Session guard", this.sessionQuery.getValue());
    const authenticated = !!this.sessionQuery.getValue().token;
    if (authenticated) {
      return true;
    }

    // Store attempted url for redirecting
    this.toastService.redirectUrl = redirectUrl;
    this.toastService.showError({
      message: 'You need to log in first.'
    });
    // // Navigate, with extras
    this.router.navigate([redirectUrl]);
    return false;
  }
}
