import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  loggedIn$ = this.select(state => !!state.token);
  user$ = this.select(['username', 'token']);

  constructor(protected store: SessionStore) {
    super(store);
  }

}
