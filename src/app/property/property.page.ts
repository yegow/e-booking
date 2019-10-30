import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Property } from '../schemas/property';
import { PropertiesService } from '../services/properties.service';
import { StateService } from '../services/state.service';
import { ReviewsService } from '../services/reviews.service';
import { Review } from '../schemas/review';

@Component({
  selector: 'app-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage implements OnInit {
  property: Property = null;
  reviews: Review[] = null;

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService,
    private propertiesService: PropertiesService,
    private reviewsService: ReviewsService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.propertiesService.fetchProperty(+params.get('id'))
      )
    )
    .subscribe(
      resp => { this.property = resp.body.result as Property; },
      error => { this.stateService.changeMessage(error.message); }
    );
  }

  ionViewWillEnter() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.reviewsService.fetchAll({
          propertyId: +params.get('id')
        })
      )
    )
    .subscribe(
      resp => { this.reviews = resp.body.result as Review[]; },
      error => { this.stateService.changeMessage(error.message); }
    );
  }

}
