import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.page.html',
  styleUrls: ['./edit-account.page.scss'],
})
export class EditAccountPage implements OnInit {
  @Input() userId;
  @Input() username;
  @Input() firstName;
  @Input() lastName;
  @Input() mobile;
  @Input() address;
  modal;

  editForm = null;

  constructor() {

  }

  ngOnInit() {
    this.editForm = new FormGroup({
      firstName: new FormControl(this.firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/[a-z]/i),
      ]),
      lastName: new FormControl(this.lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/[a-z]/i),
      ]),
      username: new FormControl(this.username, [
        Validators.required,
        Validators.minLength(2)
      ]),
      mobile: new FormControl(this.mobile, [
        Validators.minLength(10),
        // Validators.pattern(/^(+254|0)7\d{8}/),
      ]),
      address: new FormControl(this.address)
    });
  }

  dismiss() {
    this.modal.dismiss();
  }

  confirm() {}

}
