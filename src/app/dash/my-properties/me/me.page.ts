import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { SessionQuery } from 'src/app/store/session.query';
import { OrdersQuery } from 'src/app/store/orders.query';
import { PostReviewPage } from './post-review/post-review.page';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ReviewsState } from 'src/app/store/reviews.store';
import { ReviewsQuery } from 'src/app/store/reviews.query';
import { server } from 'src/app/services/config';
import { MyPropertiesQuery } from 'src/app/store/my-properties.query';
import { OrdersService } from 'src/app/services/orders.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  imagesUrl = server.url + '/ebooking/assets/images/properties/';
  loggedUser = this.sessionQuery.getValue();
  properties: any[] = null;

  constructor(
    private ordersQuery: OrdersQuery,
    private sessionQuery: SessionQuery,
    private ordersService: OrdersService,
    private modalController: ModalController,
    private reviewsService: ReviewsService,
    private myPropertiesQuery: MyPropertiesQuery,
    private alertController: AlertController,
    private propertiesService: PropertiesService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.reviewsService.fetchAll({ userId: this.loggedUser.id }).subscribe();
    this.ordersService.fetchMyProperties({
      userId: this.loggedUser.id,
    }).subscribe();
  }

  ionViewWillEnter() {
    this.myPropertiesQuery.selectAll()
      .subscribe(
        props => {
          this.properties = props;
        }
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

  async presentVacateConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Owh, 🙁',
      message: 'Sad to see you leave.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.vacate(id);
            console.log('Confirm Okay. Leaving property', id);
          }
        }
      ]
    });

    await alert.present();
  }

  vacate(id) {
    this.propertiesService.vacate(id).subscribe(
      () => {
        this.toastService.showSuccess({
          message: 'You can always come back.',
        });
      },
      err => {
        console.log('Vacate error', err);
        this.toastService.showError({
          message: err.message,
        });
      }
    );
  }

}
