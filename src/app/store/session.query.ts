import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  isLoggedIn$ = this.select(e => toBoolean(e.token));
  loggedUser$ = this.select([
    'username', 'token', 'firstName', 'lastName', 'email', 'username', 'mobile',
    'address', 'id'
  ]);

  constructor(protected store: SessionStore) {
    super(store);
  }

}
