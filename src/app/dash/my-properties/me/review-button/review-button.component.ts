import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReviewsQuery } from 'src/app/store/reviews.query';
import { Input } from '@angular/core';
import { ReviewsState } from 'src/app/store/reviews.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review-button',
  templateUrl: './review-button.component.html',
  styleUrls: ['./review-button.component.scss'],
})
export class ReviewButtonComponent implements OnInit, OnDestroy {
  @Input() userId: number;
  @Input() propertyId: number;
  @Input() actions;

  review: ReviewsState;
  rating: any[];
  reviewsSubscription: Subscription;

  constructor(
    private reviewQuery: ReviewsQuery,
  ) { }

  ngOnInit() {
    console.log('Initiated');
    this.fetchReview();
  }

  fetchReview() {
    this.reviewsSubscription = this.reviewQuery.selectAll({
      filterBy: [
        review => {
          console.log('In filter query', review);
          return review.user.id === this.userId;
        },
        review => review.property.id === this.propertyId,
      ]
    }).subscribe(
      ([fReview]) => {
        console.log('Review changed', fReview);
        if (fReview) {
          this.review = fReview;
          this.rating = Array(fReview.rating).fill(0);
        }
      },
    );
  }

  showNewModal() {
    this.actions.showNewReviewModal(
      this.propertyId,
      this.fetchReview.bind(this),
    );
  }

  showEditModal() {
    this.actions.showEditReviewModal(
      this.review,
      this.fetchReview.bind(this),
    );
  }

  ngOnDestroy() {
    this.reviewsSubscription.unsubscribe();
  }

}
