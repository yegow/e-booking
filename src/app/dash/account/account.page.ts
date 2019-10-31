import { Component, OnInit } from '@angular/core';

import { SessionQuery } from 'src/app/store/session.query';
import { ModalController } from '@ionic/angular';
import { EditAccountPage } from '../edit-account/edit-account.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  loggedUser: any = null;

  constructor(
    private sessionQuery: SessionQuery,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('View entering');
    this.sessionQuery.user$
      .subscribe(
        user => {
          console.log('Session for user', user);
          this.loggedUser = user;
        }
      );
  }

  async toggleEditModal() {
    const modal = await this.modalController.create({
      component: EditAccountPage,
      componentProps: {
        userId: this.loggedUser.id
      },
    });

    return await modal.present();
  }

  get fullName() {
    const {firstName, lastName} = this.loggedUser;
    return `${firstName} ${lastName}`;
  }

}
