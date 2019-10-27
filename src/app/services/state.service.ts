import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../schemas/user';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private messageSrc = new BehaviorSubject('');
  private user = new BehaviorSubject<User>(null);
  currentMessage = this.messageSrc.asObservable();
  loggedUser = this.user.asObservable();

  constructor() { }

  changeMessage(msg: string) {
    this.messageSrc.next(msg);
  }

  login(user: User) {
    this.user.next(user);
  }
}
