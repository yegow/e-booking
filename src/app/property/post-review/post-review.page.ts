import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewsService } from 'src/app/services/reviews.service';

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
  @Input() rating;
  @Input() comment;
  @Input() userId;
  @Input() propertyId;

  reviewForm;
  modal;

  constructor(
    private reviewsService: ReviewsService
  ) { }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      rating: new FormControl(this.rating, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]),
      comment: new FormControl(this.comment, [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(250)
      ])
    });
  }

  dismiss() {
    this.modal.dismiss();
  }

  postReview() {
    const review = reviewOpts(
      this.reviewForm,
      ['comment', 'rating']
    );

    const { userId, propertyId } = this;
    this.reviewsService.create({
      userId, propertyId, ...review
    }).subscribe();
  }

}
