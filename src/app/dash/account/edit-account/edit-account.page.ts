import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ToastService } from 'src/app/services/toast.service';

const profileOpts = (form: FormGroup, returnFields: string[]) => {
  const temp: any = {};
  returnFields.forEach(f => {
    temp[f] = form.get(f).value;
  });

  return temp;
};

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

  loading = false;
  modal;
  profileForm = null;

  constructor(
    private sessionService: SessionService,
    private toastService: ToastService,
  ) {

  }

  ngOnInit() {
    this.profileForm = new FormGroup({
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

  update(e: Event) {
    this.loading = true;
    e.preventDefault();
    const profile = profileOpts(
      this.profileForm,
      ['firstName', 'lastName', 'username', 'mobile', 'address'],
    );

    this.sessionService.update({
      ...profile,
      id: this.userId,
    }).subscribe(
      () => {
        this.loading = false;
        this.toastService.showSuccess({
          message: 'All set 👍🏽',
        });
        setTimeout(() => {
          this.dismiss();
        }, 2000);
      },
      () => {
        this.loading = false;
      }
    );
  }

}
