import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, OnDestroy {
  @Input() property;
  @Input() user;

  @ViewChild('cardInfo', {
    static: false
  }) cardInfo: ElementRef;
  card: any;
  error = null;
  cardHandler = this.onChange.bind(this);

  modal;

  constructor(
    private changeDetectRef: ChangeDetectorRef,
    private toastService: ToastService,
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple'
        }
      }
    };

    this.card = elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }

    this.changeDetectRef.detectChanges();
  }

  dismiss() {
    this.modal.dismiss();
  }

  async checkout(e: Event) {
    const res = await stripe.createToken(this.card, {
      email: this.user.email
    });
    const {error, token} = res;
    if (error) {
      this.toastService.showError({
        message: error.message
      });
    } else {
      this.toastService.showSuccess({
        message: 'Card validated. One moment please.'
      });

      this.ordersService.create({
        stripeToken: token.id,
        email: this.user.email,
        propertyPrice: this.property.price,
        propertyId: this.property.id,
        lastFour: token.card.last4,
        propertyTitle: this.property.title,
      }).subscribe(
        _ => {
          this.toastService.showSuccess({
            message: 'Your order was placed successfully'
          });
          this.dismiss();
          this.router.navigate(['/dash/property-list/mines']);
        },
        err => {
          this.dismiss();
          this.toastService.showError({
            message: err.message,
          });
        }
      );
    }
  }

}
