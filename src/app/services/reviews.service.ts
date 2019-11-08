import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { ReviewsStore, ReviewsState } from '../store/reviews.store';
import { ToastService } from './toast.service';
import { server } from './config';
import { SessionQuery } from '../store/session.query';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  reviewsUrl = `${server.url + server.apiEnd}/reviews${server.ext}`;
  userToken = this.sessionQuery.getValue().token;

  constructor(
    private http: HttpClient,
    private reviewsStore: ReviewsStore,
    private toastService: ToastService,
    private sessionQuery: SessionQuery,
  ) { }

  fetchAll(opts: {
    userId?: number,
    propertyId?: number
  }) {
    return this.http.get(
      `${this.reviewsUrl}`,
      {
        observe: 'response',
        params: {...opts as any}
      }
    ).pipe(tap(
      (resp: {body: any}) => {
        console.log('Fetched reviews', resp);
        const {body} = resp;
        if (body) {
          if (body.status === 'success') {
            return this.reviewsStore.upsertMany(body.result);
          }
        }
      },
      this.handleError.bind(this)
    ));
  }

  create(review: ReviewsState) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userToken}`,
    });

    return this.http.post(
      this.reviewsUrl,
      review,
      { observe: 'response', headers }
    ).pipe(tap(
      (resp: {body: any}) => {
        const {body} = resp;
        if (body) {
          if (body.status === 'success') {
            return this.reviewsStore.upsert(body.result.id, body.result);
          }
          this.toastService.showError({ message: resp.body.result });
        } else {
          this.toastService.showError({ message: 'Something wen\'t wrong try again.' });
        }
      },
      this.handleError.bind(this)
    ));
  }

  update(review: ReviewsState) {
    console.log(this.userToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userToken}`,
    });

    return this.http.put(
      `${this.reviewsUrl}/${review.id}`,
      review,
      { observe: 'response', headers }
    ).pipe(tap(
      (resp: {body: any}) => {
        const {body} = resp;
        if (body) {
          if (body.status === 'success') {
            console.log('Response res', body.result);
            return this.reviewsStore.update(
              review.id,
              body.result,
            );
          }
          this.toastService.showError({ message: resp.body.result });
        } else {
          this.toastService.showError({ message: 'Something wen\'t wrong try again.' });
        }
      },
      this.handleError.bind(this)
    ));
  }

  delete(reviewId: number) {
    return this.http.delete(
      `${this.reviewsUrl}/${reviewId}`,
      {observe: 'response'}
    ).pipe(tap(
      (resp: {body: any}) => {
        const {body} = resp;
        if (body) {
          if (body.status === 'success') {
            return this.reviewsStore.remove(body.result.id);
          }
          this.toastService.showError({ message: resp.body.result});
        } else {
          this.toastService.showError({ message: 'Something wen\'t wrong try again.' });
        }
      },
      this.handleError.bind(this)
    ));
  }

  // Error handleError
  handleError(err: any) {
    // {status: number, ok: boolean} = err
    if (!err.ok) {
      this.toastService.showError({
        message: 'Can\'t complete request at the moment.'
         + 'Please try again later ⏱️.'
      });
    }
    console.log('Full error object', err);
    throw err;
  }

}
