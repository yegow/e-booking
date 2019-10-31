import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ReviewsStore, ReviewsState } from './reviews.store';

@Injectable({ providedIn: 'root' })
export class ReviewsQuery extends QueryEntity<ReviewsState> {

  constructor(protected store: ReviewsStore) {
    super(store);
  }

}
