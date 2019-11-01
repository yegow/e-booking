import { Component, OnInit } from '@angular/core';

import { PropertiesQuery } from '../store/properties.query';
// import { OrdersService } from '../services/orders.service';
import { ReviewsService } from '../services/reviews.service';
import { ReviewsQuery } from '../store/reviews.query';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PostReviewPage } from './post-review/post-review.page';
import { SessionQuery } from '../store/session.query';

@Component({
  selector: 'app-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage implements OnInit {
  url = 'https://students.njoka.net/ebooking/assets/images/properties';
  loggedUser: any = null;
  property: any = null;
  reviews: any[] = null;

  constructor(
    private propertiesQuery: PropertiesQuery,
    private sessionQuery: SessionQuery,
    private reviewsQuery: ReviewsQuery,
    // private ordersService: OrdersService,
    private reviewsService: ReviewsService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loggedUser = !!this.sessionQuery.getValue().token;

    this.propertiesQuery.activeProperty$
      .subscribe(
        (property) => {
          if (!property) {
            return this.router.navigate(['/properties']);
          }
          this.property = property;
          if (this.property && this.property.id) {
            // this.reviewsService.fetchAll({
            //   propertyId: this.property.id
            // }).subscribe();
          }
        }
      );

    // this.reviewsQuery.selectAll({filterBy: e => e.propertyId === this.property.id})
    //   .subscribe(entities => {
    //     this.reviews = entities;
    //   });
  }

  async showModal() {
    const modal = await this.modalController.create({
      component: PostReviewPage
    });

    return await modal.present();
  }

  // order() {
  //   this.ordersService.order(this.property.id);
  // }

}
