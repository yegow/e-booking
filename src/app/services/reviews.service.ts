import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Review } from '../schemas/review';
import { EBResponse } from '../schemas/server-response';
import {url, apiEnd } from './config';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  reviewsUrl = url + apiEnd + '/reviews';

  constructor(
    private http: HttpClient
  ) { }

  fetchAll(opts: {
    userId?: number,
    propertyId?: number
  }): Observable<HttpResponse<EBResponse>> {
    return this.http.get<EBResponse>(
      `${this.reviewsUrl}`,
      {
        observe: 'response',
        params: {...opts as any}
      }
    );
  }

  update(review: Review): Observable<HttpResponse<EBResponse>> {
    return this.http.put<EBResponse>(
      `${this.reviewsUrl}/${review.id}`,
      review,
      {observe: 'response'}
    );
  }

  delete(reviewId: number) {
    return this.http.delete<EBResponse>(
      `${this.reviewsUrl}/${reviewId}`,
      {observe: 'response'}
    );
  }
}
