import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { SessionQuery } from 'src/app/store/session.query';
import { OrdersQuery } from 'src/app/store/orders.query';
import { PostReviewPage } from './post-review/post-review.page';

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
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ordersQuery.selectAll()
      .subscribe(
        orders => {
          this.orders = orders;
        },
      );
  }

  async showReviewModal(propertyId) {
    const modal = await this.modalController.create({
      component: PostReviewPage,
      componentProps: {
        userId: this.loggedUser.id,
        propertyId,
      }
    });

    return await modal.present();
  }

}
