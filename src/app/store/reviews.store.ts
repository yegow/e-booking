import { Injectable } from '@angular/core';
import { Review } from './review.model';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';

export interface ReviewsState extends EntityState<Review>, ActiveState {
  active: null;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'reviews' })
export class ReviewsStore extends EntityStore<ReviewsState> {

  constructor() {
    super();
  }

}

