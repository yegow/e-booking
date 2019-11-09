import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { ReviewsStore, ReviewsState } from '../store/reviews.store';
import { ToastService } from './toast.service';
import { server } from './config';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  reviewsUrl = `${server.url + server.apiEnd}/reviews${server.ext}`;

  constructor(
    private http: HttpClient,
    private reviewsStore: ReviewsStore,
    private toastService: ToastService
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
        const {body} = resp;
        if (body) {
          if (body.status === 'success') {
            return this.reviewsStore.upsertMany(body.result);
          }
          this.toastService.showError({ message: resp.body.result });
        } else {
          this.toastService.showError({ message: 'Something wen\'t wrong, try again.' });
        }
      },
      this.handleError.bind(this)
    ));
  }

  create(review: ReviewsState) {
    return this.http.post(
      `${this.reviewsUrl}/${review.id}`,
      review,
      {observe: 'response'}
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
    return this.http.put(
      `${this.reviewsUrl}/${review.id}`,
      review,
      {observe: 'response'}
    ).pipe(tap(
      (resp: {body: any}) => {
        const {body} = resp;
        if (body) {
          if (body.status === 'success') {
            return this.reviewsStore.update(body.result.id, body.result);
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
    if (err.status === 0) {
      this.toastService.showError({
        message: 'Please try again later ⏱️.'
      });
    }
    console.log('Full error object', err);
  }

}
