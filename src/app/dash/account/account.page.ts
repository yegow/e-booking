import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/schemas/user';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  loggedUser: User;

  constructor(
    public usersService: UsersService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.loggedUser = this.usersService.loggedUser;
    console.log('Logged User:', this.usersService.loggedUser);
  }

  ionViewWillEnter() {
    this.stateService.loggedUser.subscribe(
      user => {
        this.loggedUser = user;
      }
    );
  }

  get fullName() {
    const {firstName, lastName} = this.loggedUser;
    return `${firstName} ${lastName}`;
  }

}
