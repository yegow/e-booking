import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { OrdersStore, OrdersState } from '../store/orders.store';
import { SessionQuery } from '../store/session.query';
import { ToastService } from './toast.service';
import { server } from './config';
import { PropertiesStore } from '../store/properties.store';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  ordersUrl = `${server.url + server.apiEnd}/orders${server.ext}`;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private ordersStore: OrdersStore,
    private sessionQuery: SessionQuery,
    private propertiesStore: PropertiesStore
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

  create(opts: {
    propertyId: string,
    stripeToken: string,
    propertyPrice: number,
    lastFour: string,
    email: string,
    propertyTitle: string
  }) {
    const { id: userId, token } = this.sessionQuery.getValue();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(
      `${this.ordersUrl}`,
      {...opts, userId},
      {observe: 'response', headers}
    ).pipe(tap(
      resp => {
        if (resp.status === 201) {
          const {result} = resp.body as any;
          this.ordersStore.add(result);
          this.propertiesStore.remove(opts.propertyId);
        } else {
          console.log('Big error', resp);
          return this.toastService.showError({
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
