import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @Input() propertyId;
  @Input() userId;
  @Input() userEmail;

  modal;

  constructor() { }

  ngOnInit() {
  }

  dismiss() {
    this.modal.dismiss();
  }

}
