import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
  id?: number;
  token?: string;
  username: string;
  lastName: string;
  firstName: string;
  email: string;
  mobile?: string;
  address?: string;
  role?: string;
}

export function createInitialState(): SessionState {
  return {
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  };
}

export function createSession(user: SessionState) {
  return { ...user };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

  login(data: SessionState) {
    const user = createSession(data);
    this.update({ ...user });
  }

  logout() {
      this.update(createInitialState());
  }

}
