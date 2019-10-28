import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EBResponse } from '../schemas/server-response';
import {url, apiEnd } from './config';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  ordersUrl = url + apiEnd + '/orders';

  constructor(
    private http: HttpClient
  ) { }

  fetchAll(opts: {
    userId?: number,
    property?: number,
    sort?: string
  }): Observable<HttpResponse<EBResponse>> {
    return this.http.get<EBResponse>(
      `${this.ordersUrl}`,
      {
        observe: 'response',
        params: {...opts as any}
      }
    );
  }

  delete(orderId: number): Observable<HttpResponse<EBResponse>> {
    return this.http.delete<EBResponse>(
      `${this.ordersUrl}/${orderId}`,
      {observe: 'response'}
    );
  }
}
