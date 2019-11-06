import { Component, OnInit } from '@angular/core';
import { OrdersQuery } from 'src/app/store/orders.query';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.page.html',
  styleUrls: ['./payment-history.page.scss'],
})
export class PaymentHistoryPage implements OnInit {
  orders: any[];
  constructor(
    private ordersQuery: OrdersQuery,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ordersQuery.selectAll()
      .subscribe(
        orders => {
          this.orders = orders;
        },
      );
  }

}
