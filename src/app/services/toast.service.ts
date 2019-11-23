import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  redirectUrl: string;
  private messageSrc = new BehaviorSubject(null);
  currentMessage = this.messageSrc.asObservable();

  constructor() { }

  protected showToast(opts: {
    header?: string,
    color?: string,
    message: string,
  }) {
    this.messageSrc.next(opts);
  }

  showError(opts: {
    message: string
  }) {
    this.showToast({
      color: 'danger',
      header: 'Whoops!',
      ...opts
    });
  }

  showSuccess(opts: {
    message: string
  }) {
    this.showToast({
      color: 'success',
      header: 'Nice!',
      ...opts
    });
  }
}
