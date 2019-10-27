import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { UsersService } from '../services/users.service';
import { StateService } from '../services/state.service';

const userOpts = (form: FormGroup, returnFields: string[]) => {
  const temp: any = {};
  returnFields.forEach(f => {
    temp[f] = form.get(f).value;
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
    private usersService: UsersService,
    private stateService: StateService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signUp() {
    this.usersService.signUp(userOpts(
      this.signUpForm,
      ['firstName', 'lastName', 'email', 'username', 'mobile', 'address', 'password']
    ))
    .subscribe(
      res => {
        if (res.body.status === 'success') {
          this.stateService.login(res.body.result);
          return this.router.navigate(['/dash']);
        }

        this.stateService.changeMessage(res.body.result);
      },
      error => {
        this.stateService.changeMessage(error.message);
      }
    );
  }

}
