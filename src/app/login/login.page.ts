import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { UsersService } from '../services/users.service';

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
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  login() {
    this.userService.login({
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
      })
      .then(_user => {
        this.router.navigate(['/dash']);
      })
      .catch(async err => {
        const errToast = await this.toastController.create({
          header: "There was an error",
          message: err.message,
          color: 'danger',
          showCloseButton: true,
          closeButtonText: "Close",
          duration: 3000
        });
        
        errToast.present();
      });
  }

}
