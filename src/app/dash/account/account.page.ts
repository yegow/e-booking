import { Component, OnInit } from '@angular/core';

import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  loggedUser: any = null;

  constructor(
    private sessionQuery: SessionQuery
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

  get fullName() {
    const {firstName, lastName} = this.loggedUser;
    return `${firstName} ${lastName}`;
  }

}
