import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ToastService } from 'src/app/services/toast.service';

/**
 * Helper to extract form values as an object
 * @param form FormGroup
 * @param returnFields Object
 */
const profileOpts = (form: FormGroup, returnFields: string[]) => {
  const temp: any = {};
  returnFields.forEach(f => {
    temp[f] = form.get(f).value;
  });

  return temp;
};

/**
 * Custom validator function to check password match
 * @return Object
 */
const passwordMatch: ValidatorFn = (control): ValidationErrors | null => {
  if (control.parent) {
    const { newPassword } = control.parent.controls as any;
    if (control.dirty) {
      console.log(newPassword.value, control.value);
      if (newPassword.value !== control.value) {
        return { passwordMismatch: { value: control.value }};
      }
    }
  }
  return null;
};
const checkCurrent: ValidatorFn = (control): ValidationErrors | null => {
  if (control.parent) {
    const { currentPassword } = control.parent.controls as any;
    if (control.dirty) {
      if (currentPassword.value === control.value) {
        return { passwordMatchesCurrent: { value: control.value }};
      }
    }
  }
  return null;
};

const passReg = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.page.html',
  styleUrls: ['./edit-account.page.scss'],
})
export class EditAccountPage implements OnInit {
  @Input() id;
  @Input() token;
  @Input() username;
  @Input() firstName;
  @Input() lastName;
  @Input() mobile;
  @Input() address;
  @Input() isForPassword;

  loading = false;
  modal;
  profileForm = null;
  passwordForm = null;

  constructor(
    private sessionService: SessionService,
    private toastService: ToastService,
  ) {

  }

  ngOnInit() {
    if (this.isForPassword) {
      this.passwordForm = new FormGroup({
        currentPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern(passReg),
        ]),
        newPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(passReg),
          checkCurrent,
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          passwordMatch,
        ]),
      });
    } else {
      this.profileForm = new FormGroup({
        firstName: new FormControl(this.firstName, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-z]+$/i),
        ]),
        lastName: new FormControl(this.lastName, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-z]+$/i),
        ]),
        username: new FormControl(this.username, [
          Validators.required,
          Validators.minLength(2)
        ]),
        mobile: new FormControl(this.mobile, [
          Validators.minLength(10),
          Validators.pattern(/^(0|\+254)7\d{8}$/),
        ]),
        address: new FormControl(this.address)
      });
    }
  }

  dismiss() {
    this.modal.dismiss();
  }

  update(e: Event) {
    e.preventDefault();
    this.loading = true;

    let profile;
    if (this.isForPassword) {
      profile = profileOpts(
        this.passwordForm,
        ['currentPassword', 'newPassword'],
      );
    } else {
      profile = profileOpts(
        this.profileForm,
        ['firstName', 'lastName', 'username', 'mobile', 'address'],
      );
    }

    this.sessionService.update({
      ...profile,
      id: this.id,
    })
      .subscribe(
        () => {
          this.loading = false;
          this.toastService.showSuccess({
            message: 'All set 👍🏽',
          });
          setTimeout(() => {
            this.dismiss();
          }, 2000);
        },
        ({ message }) => {
          this.toastService.showError({ message });
          this.loading = false;
        }
      );
  }

}
