import { TestBed } from '@angular/core/testing';

import { ReviewsService } from './reviews.service';

describe('ReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewsService = TestBed.get(ReviewsService);
    expect(service).toBeTruthy();
  });
});
