import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { OrdersStore, OrdersState } from '../store/orders.store';
import { SessionQuery } from '../store/session.query';
import { ToastService } from './toast.service';
import {url, apiEnd } from './config';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  ordersUrl = url + apiEnd + '/orders';

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private ordersStore: OrdersStore,
    private sessionQuery: SessionQuery
  ) { }

  fetchAll(opts: {
    userId?: number,
    propertyId?: number,
    sort?: string
  }) {
    return this.http.get(
      `${this.ordersUrl}`,
      {
        observe: 'response',
        params: {...opts as any}
      }
    ).pipe(tap(
      resp => {
        if (resp.status === 200) {
          const {status, result} = resp.body as any;
          if (status === 'success') {
            return this.ordersStore.set(result);
          }

          this.toastService.showError(result);
        } else {
          console.error('Unexpected status::', resp.status);
        }
      },
      this.handleError.bind(this)
    ));
  }

  async order(propertyId: number) {
    const userId = this.sessionQuery.getValue().id;
    return this.http.post(
      `${this.ordersUrl}`,
      {propertyId, userId},
      {observe: 'response'}
    ).pipe(tap(
      resp => {
        console.log('Received response');
        if (resp.status === 201) {
          const {result} = resp.body as any;
          this.ordersStore.add(result);
          this.toastService.showSuccess({
            message: 'Item added to cart.'
          });
        } else {
          this.toastService.showError({
            message: 'Something went wrong, let\'s try that again.'
          });
        }
      },
      this.handleError
    ));
  }

  delete(orderId: number) {
    return this.http.delete(
      `${this.ordersUrl}/${orderId}`,
      {observe: 'response'}
    ).pipe(tap(
      resp => {
        if (resp.status === 200) {
          const {result} = resp.body as any;
          this.ordersStore.remove(orderId);
          this.toastService.showSuccess({
            message: result
          });
        } else {
          this.toastService.showError({
            message: 'Something went wrong, let\'s try that again.'
          });
        }
      },
      this.handleError
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
