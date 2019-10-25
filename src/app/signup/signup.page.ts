import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { UsersService } from '../services/users.service';

const userOpts = (form: FormGroup, returnFields: string[]) => {
  const temp: any = {};
  returnFields.forEach(f => {
    temp[f] = form.get(f).value
  });

  return temp;
  };

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/[a-z]/i),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/[a-z]/i),
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      // Validators.pattern(/[a-z0-9@\.]/i),
    ]),
    mobile: new FormControl('', [
      Validators.minLength(10),
      // Validators.pattern(/^(+254|0)7\d{8}/),
    ]),
    address: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/[a-z]/i),
    ]),
    rememberMe: new FormControl('', [
      Validators.requiredTrue
    ]),
  });

  constructor(
    private userService: UsersService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  signUp() {
    this.userService.signUp(userOpts(
      this.signUpForm,
      ['firstName', 'lastName', 'email', 'username', 'mobile', 'address', 'password']
    ))
    .then(_user => {
      this.router.navigate(['/dash']);
    })
    .catch(async err => {
      const errToast = await this.toastController.create({
        message: err.message,
        color: 'danger'
      });
      
      errToast.present();
    });
  }

}