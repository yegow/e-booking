import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { SessionStore, SessionState } from '../store/session.store';
import { apiEnd, url } from './config';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  usersUrl = url + apiEnd + '/auth';

  constructor(
    private sessionStore: SessionStore,
    private http: HttpClient
  ) { }

  signUp(user: SessionState) {
    return this.http.post(
      `${this.usersUrl}/signup`,
      user,
      {observe: 'response'}
    ).pipe(tap(resp => {
      console.log('Tapping resp', resp);
    }));
  }

  login(user?: {username: string, password: string}) {
    return this.http.post(
      `${this.usersUrl}/login`,
      {...user},
      {observe: 'response'}
    );
  }

}
