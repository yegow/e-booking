import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { EBResponse } from '../schemas/server-response';
import { Property } from '../schemas/property';
import {url, apiEnd } from './config';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  propertiesUrl = url + apiEnd + '/properties';

  constructor(private http: HttpClient) { }

  fetchProperties(options: {
    userId?: number,
    propertyId?: number,
    type?: string,
    sort?: string
  }): Observable<HttpResponse<EBResponse>> {
    return this.http.get<EBResponse>(
      this.propertiesUrl,
      {
        observe: 'response',
        params: {
          ...options as any
        }
      }
    );
  }

  fetchProperty(id: number): Observable<HttpResponse<EBResponse>> {
    return this.http.get<EBResponse>(
      `${this.propertiesUrl}/${id}`,
      {observe: 'response'}
    );
  }

  updateProperty(property: Property): Observable<HttpResponse<EBResponse>> {
    return this.http.put<EBResponse>(
      `${this.propertiesUrl}/${property.id}`,
      property,
      {observe: 'response'}
    );
  }
}
