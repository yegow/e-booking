import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { SessionQuery } from 'src/app/store/session.query';
import { EditAccountPage } from './edit-account/edit-account.page';
import { AccountPopoverComponent } from 'src/app/components/account-popover/account-popover.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  loggedUser: any = null;
  loggedUserSubscription: Subscription;

  constructor(
    private sessionQuery: SessionQuery,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loggedUserSubscription = this.sessionQuery.loggedUser$
      .subscribe(
        user => {
          this.loggedUser = user;
        }
      );
  }

  ionViewWillLeave() {
    this.loggedUserSubscription.unsubscribe();
  }

  async showEditModal() {
    const modal = await this.modalController.create({
      component: EditAccountPage,
      componentProps: {
        ...this.loggedUser
      },
    });

    return await modal.present();
  }

  get fullName() {
    const {firstName, lastName} = this.loggedUser;
    return `${firstName} ${lastName}`;
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AccountPopoverComponent,
      event: ev,
      componentProps: {
        showEditModal: this.showEditModal.bind(this)
      }
      // translucent: true
    });

    return await popover.present();
  }
}
