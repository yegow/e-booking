import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ToastService } from '../services/toast.service';
import { SessionQuery } from '../store/session.query';
import { switchMap, take } from 'rxjs/operators';

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
      return this.sessionQuery.isLoggedIn$.pipe(
        take(1),
        switchMap((isLoggedIn) => {
          if (!isLoggedIn) {
            this.router.navigate(['/login']);
            this.toastService.showError({
              message: 'You need to log in first.'
            });
          }

          return of(isLoggedIn);
        })
      );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
