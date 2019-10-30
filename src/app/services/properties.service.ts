import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { PropertiesStore, PropertiesState } from '../store/properties.store';
import { ToastService } from './toast.service';
import {url, apiEnd } from './config';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  propertiesUrl = url + apiEnd + '/properties';

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private propertiesStore: PropertiesStore
  ) {  }

  fetchProperties(options: PropertiesState) {
    return this.http.get(
      this.propertiesUrl,
      {
        observe: 'response',
        params: {
          ...options as any
        }
      }
    ).pipe(tap(
      (resp: {body: any}) => {
        if (resp.body.status === 'success') {
          // return this.propertiesStore.set(resp.body.result);
          return this.propertiesStore.upsertMany(resp.body.result);
        }
        this.toastService.showError(resp.body.result);
      },
      this.handleError
    ));
  }

  fetchProperty(id: number) {
    return this.http.get(
      `${this.propertiesUrl}/${id}`,
      {observe: 'response'}
    ).pipe(tap(
      (resp: {body: any}) => {
        if (resp.body.status === 'success') {
          const {result} = resp.body;
          this.propertiesStore.upsert(result.id, result);
          return this.propertiesStore.setActive(result.id);
        }
        this.toastService.showError(resp.body.result);
      },
      this.handleError
    ));
  }

  updateProperty(property: PropertiesState) {
    return this.http.put(
      `${this.propertiesUrl}/${property.id}`,
      property,
      {observe: 'response'}
    ).pipe(tap(
      (resp: {body: any}) => {
        if (resp.body.status === 'success') {
          const {result} = resp.body;
          this.propertiesStore.update(result.id, result);
          return this.propertiesStore.setActive(result.id);
        }
      },
      this.handleError
    ));
  }

  // Error handleError
  handleError(err: any) {
    // {status: number, ok: boolean} = err
    if (err.status === 0) {
      this.toastService.showError({
        message: 'Please try again later ⏱️.'
      });
    }
    console.log('Full error object', err);
  }
}
