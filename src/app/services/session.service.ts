import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { SessionStore, SessionState } from '../store/session.store';
import { ToastService } from './toast.service';
import { server } from './config';
import { SessionQuery } from '../store/session.query';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  usersUrl = server.url + server.apiEnd + '/auth';

  constructor(
    private sessionStore: SessionStore,
    private http: HttpClient,
    private toastService: ToastService,
    private sessionQuery: SessionQuery,
  ) { }



  signUp(user: SessionState) {
    return this.http.post(
      `${this.usersUrl}/signup${server.ext}`,
      user,
      {observe: 'response'}
    ).pipe(tap(
      (resp: HttpResponse<any>) => {
        if (resp.body.status === 'success') {
          const { result } = resp.body;
          return this.sessionStore.login(result);
        }

        this.toastService.showError({
          message: resp.body.result
        });
      },
      this.handleError.bind(this)
    ));
  }

  login(user?: {username: string, password: string}) {
    return this.http.post(
      `${this.usersUrl}/login${server.ext}`,
      {...user},
      {observe: 'response'}
    ).pipe(tap(
      (resp: HttpResponse<any>) => {
        const { body } = resp;
        if (body) {
          if (body.status === 'success') {
            return this.sessionStore.login(body.result);
          }
          this.toastService.showError({ message: resp.body.result });
        } else {
          this.toastService.showError({ message: 'Something wen\'t wrong, try again.' });
        }
      },
      this.handleError.bind(this)
    ));
  }

  update(user: SessionState) {
    const userToken = this.sessionQuery.getValue().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userToken}`
    });

    return this.http.put(
      `${this.usersUrl + server.ext}/${user.id}`,
      { ...user, userId: user.id },
      {observe: 'response', headers }
    ).pipe(tap(
      (resp: HttpResponse<any>) => {
        const { body } = resp;
        if (body) {
          if (body.status === 'success') {
            return this.sessionStore.login(body.result);
          }
          // this.toastService.showError({ message: resp.body.result });
          throw new Error(body.result);
        } else {
          this.toastService.showError({ message: 'Something wen\'t wrong, try again.' });
        }
      },
      this.handleError.bind(this)
    ));
  }

  getUser() {
    return this.sessionQuery.getValue();
  }

  logout() {
    this.sessionStore.logout();
  }

  // Error handle
  handleError(err: any) {
    let message = '';
    // {status: number, ok: boolean} = err
    if (err.status === 404) {
      message = 'This user does not exist.';
    }
    if (err.status === 0) {
      message = 'Could not send request. Please try again later ⏱️.';
    }

    this.toastService.showError({
       message,
    });
    console.log('Full error object', err);
    throw err;
  }

}
