import { Component, OnInit, OnDestroy } from '@angular/core';

import { PropertiesQuery } from '../store/properties.query';
// import { OrdersService } from '../services/orders.service';
import { ReviewsService } from '../services/reviews.service';
import { ReviewsQuery } from '../store/reviews.query';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SessionQuery } from '../store/session.query';
import { CheckoutPage } from './checkout/checkout.page';
import { Subscription } from 'rxjs';
import { server } from '../services/config';

@Component({
  selector: 'app-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage implements OnInit, OnDestroy {
  url = server.url + '/ebooking/assets/images/properties';
  ratings: any[];
  loggedUser: any = null;
  property: any = null;
  reviews: any[] = null;
  propertiesSubscription: Subscription;

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
    this.loggedUser = this.sessionQuery.getValue();

    this.propertiesSubscription = this.propertiesQuery.activeProperty$
      .subscribe(
        (property) => {
          if (!property) {
            return this.router.navigate(['/properties']);
          }
          this.property = property;
          if (this.property && this.property.id) {
            this.reviewsService.fetchAll({
              propertyId: this.property.id
            }).subscribe();
            this.ratings = Array(+this.property.rating).fill(0);
          }
        }
      );

    this.fetchReviews();
  }

  ionViewWillEnter() {
    this.reviewsService.fetchAll({
      propertyId: this.property.id,
    }).subscribe(
      (res) => {
        const { body: { result }} = res;
        console.log(result);
        this.reviews = result;
      }
    );
  }

  fetchReviews() {
    this.reviewsQuery.selectAll({filterBy: e => e.propertyId === this.property.id})
      .subscribe(entities => {
        this.reviews = entities;
      });
  }

  async showCheckoutModal() {
    const modal = await this.modalController.create({
      component: CheckoutPage,
      componentProps: {
        user: this.loggedUser,
        property: this.property,
      }
    });

    return await modal.present();
  }

  // order() {
  //   this.ordersService.order(this.property.id);
  // }

  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }

  get avgRating() {
    if (!this.reviews.length) {
      return [];
    }
    const ratings = this.reviews.map(r => r.rating);
    console.log('Ratings count', ratings, ratings);
    const total = ratings.reduce((acc, v) => acc += +v, 0);
    console.log('Total', total, ratings.length);
    return Array(Math.round(total / ratings.length)).fill(0);
  }

  getRatingArray(n) {
    const temp = [];
    for (let i = 0; i < n; i++) {
      temp.push(4);
    }

    return temp;
  }

}
