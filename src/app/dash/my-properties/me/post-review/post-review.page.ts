import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ToastService } from 'src/app/services/toast.service';
import { ReviewsState } from 'src/app/store/reviews.store';

const reviewOpts = (form: FormGroup, returnFields: string[]) => {
  const temp: any = {};
  returnFields.forEach(f => {
    temp[f] = form.get(f).value;
  });

  return temp;
};

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.page.html',
  styleUrls: ['./post-review.page.scss'],
})
export class PostReviewPage implements OnInit {
  @Input() review: ReviewsState;
  @Input() propertyId;
  @Input() userId;
  @Input() done;

  reviewForm: FormGroup;
  modal;
  isNew = true;
  loading = false;

  constructor(
    private reviewsService: ReviewsService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    let rating, comment;
    if (this.review) {
      rating = this.review.rating;
      comment = this.review.comment;
      this.isNew = !this.review;
    }

    this.reviewForm = new FormGroup({
      rating: new FormControl(rating || null, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]),
      comment: new FormControl(comment || null, [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(250)
      ])
    });
  }

  dismiss() {
    this.modal.dismiss();
  }

  postReview(e: Event) {
    e.preventDefault();
    this.loading = true;
    const review = reviewOpts(
      this.reviewForm,
      ['comment', 'rating']
    );

    let userId;
    let propertyId;
    let action;
    let id;
    if (this.isNew) {
      userId = this.userId;
      propertyId = this.propertyId;
      action = 'create';
    } else {
      console.log(this.review);
      userId = this.review.user.id;
      propertyId = this.review.property.id;
      id = this.review.id;
      action = 'update';
    }

    this.reviewsService[action]({
      userId, propertyId, id, ...review,
    }).subscribe(
      () => {
        this.loading = false;
        this.toastService.showSuccess({
          message: `Your review was successfully ${this.isNew ? 'posted' : 'updated'}.`,
        });
        setTimeout(() => {
          this.done();
          this.reviewForm.reset();
          this.dismiss();
        }, 2000);
      },
      () => {
        this.loading = false;
      },
    );
  }

  get ratings() {
    const rating = this.reviewForm.get('rating');
    if (rating.valid) {
      return Array(rating.value).fill(0);
    }
    return [];
  }

}
