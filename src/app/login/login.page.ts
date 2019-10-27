import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsersService } from '../services/users.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(
    private userService: UsersService,
    private stateService: StateService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    this.userService.login({
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
      })
      .subscribe(
        res => {
          if (res.body.status === 'success') {
            this.stateService.login(res.body.result);
            return this.stateService.login(res.body.result);
          }

          this.stateService.changeMessage(res.body.result);
        },
        error => {
          this.stateService.changeMessage(error.message);
        }
      );
  }

}
