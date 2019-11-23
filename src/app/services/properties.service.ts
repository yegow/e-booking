import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { PropertiesStore, PropertiesState } from '../store/properties.store';
import { ToastService } from './toast.service';
import { server } from './config';
import { SessionQuery } from '../store/session.query';
import { MyPropertiesStore } from '../store/my-properties.store';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  propertiesUrl = `${server.url + server.apiEnd}/properties${server.ext}`;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private propertiesStore: PropertiesStore,
    private sessionQuery: SessionQuery,
    private myPropertiesStore: MyPropertiesStore,
  ) {  }

  updateFilter(filter: string) {
    this.propertiesStore.update(() => ({
      ui: { filter }
    }));
  }

  fetchProperties(options?: PropertiesState) {
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
        console.log('Fetched', resp);
        if (resp.body.status === 'success') {
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

  vacate(id: number) {
    const { id: userId, token } = this.sessionQuery.getValue();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const vacateUrl = `${server.url + server.apiEnd}/vacate.php`;
    return this.http.get(
      `${vacateUrl}`,
      {
        observe: 'response',
        headers,
        params: { propertyId: id as any },
      }
    ).pipe(tap(
      (resp: HttpResponse<any>) => {
        if (resp.body.status === 'success') {
          const {result} = resp.body;
          this.myPropertiesStore.remove(result.id);
          return this.fetchProperties().subscribe();
        } else {
          throw new Error(resp.body.result);
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
