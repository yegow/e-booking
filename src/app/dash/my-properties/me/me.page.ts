import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { SessionQuery } from 'src/app/store/session.query';
import { OrdersQuery } from 'src/app/store/orders.query';
import { PostReviewPage } from './post-review/post-review.page';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ReviewsState } from 'src/app/store/reviews.store';
import { ReviewsQuery } from 'src/app/store/reviews.query';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  loggedUser = this.sessionQuery.getValue();
  orders: any[] = null;

  constructor(
    private ordersQuery: OrdersQuery,
    private sessionQuery: SessionQuery,
    private modalController: ModalController,
    private reviewsService: ReviewsService,
    private reviewsQuery: ReviewsQuery,
  ) { }

  ngOnInit() {
    this.reviewsService.fetchAll({ userId: this.loggedUser.id }).subscribe();
  }

  ionViewWillEnter() {
    this.ordersQuery.selectAll()
      .subscribe(
        orders => {
          this.orders = orders;
        },
      );
  }

  async showReviewModal(opts: {
    propertyId?: number,
    review?: ReviewsState,
    done?: () => void,
  }) {
    let modalProps: { [key: string]: any } = {};

    if (opts.propertyId) {
      modalProps = {
        propertyId: opts.propertyId,
        userId: this.loggedUser.id,
      };
    } else {
      modalProps.review = { ...opts.review };
    }

    const modal = await this.modalController.create({
      component: PostReviewPage,
      componentProps: {
        ...modalProps,
        done: opts.done,
      },
    });

    return await modal.present();
  }

  get actions() {
    const self = this;
    return {
      showNewReviewModal(
        propertyId: number,
        done: () => void,
      ) {
        self.showReviewModal({ propertyId, done });
      },
      showEditReviewModal(
        review: ReviewsState,
        done: () => void,
      ) {
        self.showReviewModal({ review, done });
      }
    };
  }

}
