import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.page.html',
  styleUrls: ['./post-review.page.scss'],
})
export class PostReviewPage implements OnInit {
  @Input() rating;
  @Input() comment;

  reviewForm;
  modal;

  constructor() { }

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

}
