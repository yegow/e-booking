import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavParams } from '@ionic/angular';

import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.page.html',
  styleUrls: ['./edit-account.page.scss'],
})
export class EditAccountPage implements OnInit {
  userId;
  loggedUser;

  editForm = new FormGroup({
    firstName: new FormControl(this.loggedUser.firstName, [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/[a-z]/i),
    ]),
    lastName: new FormControl(this.loggedUser.lastName, [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/[a-z]/i),
    ]),
    username: new FormControl(this.loggedUser.username, [
      Validators.required,
      Validators.minLength(2)
    ]),
    mobile: new FormControl(this.loggedUser.mobile, [
      Validators.minLength(10),
      // Validators.pattern(/^(+254|0)7\d{8}/),
    ]),
    address: new FormControl(this.loggedUser.address)
  });

  constructor(
    private sessionQuery: SessionQuery,
    private navParams: NavParams
  ) {
    this.userId = navParams.get('userId');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.sessionQuery.user$
      .subscribe(user => {
        this.loggedUser = user;
      });
  }

  confirm() {}

}
