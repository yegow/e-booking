import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SessionService } from '../services/session.service';

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
      Validators.minLength(6),
      Validators.pattern(/[a-z0-9#@.!]/i),
    ])
  });

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    this.sessionService.login({
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
      })
      .subscribe(
        resp => {
          const {body} = resp as any;
          if (body && body.status === 'success') {
            return this.router.navigate(['/dash']);
          }
        }
      );
  }

}
