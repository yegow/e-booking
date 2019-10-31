import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { SessionStore, SessionState } from '../store/session.store';
import { ToastService } from './toast.service';
import { apiEnd, url } from './config';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  usersUrl = url + apiEnd + '/auth';

  constructor(
    private sessionStore: SessionStore,
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  signUp(user: SessionState) {
    return this.http.post(
      `${this.usersUrl}/signup`,
      user,
      {observe: 'response'}
    ).pipe(tap(
      (resp: {body: any}) => {
        if (resp.body.status === 'success') {
          return this.sessionStore.update(resp.body.result);
        }

        this.toastService.showError(resp.body.result);
      },
      this.handleError.bind(this)
    ));
  }

  login(user?: {username: string, password: string}) {
    return this.http.post(
      `${this.usersUrl}/login`,
      {...user},
      {observe: 'response'}
    ).pipe(tap(
      (resp) => {
        switch (resp.status) {
          case 204:
            this.toastService.showError({
              message: 'No user by that username.'
            });
            break;
          case 200:
            const {status, result} = resp.body as any;
            if (status === 'success') {
              console.log("Loggin in user:", result);
              return this.sessionStore.update(result);
            }

            this.toastService.showError(result);
            break;
          default:
          console.log('Unexpected status::', resp.status);
        }
      },
      this.handleError.bind(this)
    ));
  }

  // Error handle
  handleError(err: any) {
    // {status: number, ok: boolean} = err
    if (err.status === 0) {
      this.toastService.showError({
        message: 'Please try again later ⏱️.'
      });
    }
    console.log('Full error object', err);
    throw err;
  }

}
