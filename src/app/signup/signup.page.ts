import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SessionService } from '../services/session.service';

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
      Validators.email,
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
      Validators.minLength(6),
      Validators.pattern(/[a-z0-9#@.!]/i),
    ]),
    rememberMe: new FormControl('', [
      Validators.requiredTrue
    ]),
  });

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signUp() {
    const user = userOpts(
      this.signUpForm,
      ['firstName', 'lastName', 'email', 'username', 'mobile', 'address', 'password']
    );

    this.sessionService.signUp(user).subscribe(
      res => {
        if (res.body.status === 'success') {
          return this.router.navigate(['/dash']);
        }
      }
    );
  }

}
