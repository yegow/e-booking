import { Component, OnInit } from '@angular/core';

import { SessionQuery } from 'src/app/store/session.query';
import { OrdersQuery } from 'src/app/store/orders.query';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  orders: any[] = null;

  constructor(
    private ordersService: OrdersService,
    private ordersQuery: OrdersQuery,
    private sessionQuery: SessionQuery
  ) { }

  ngOnInit() {
    this.fetchOrders()
      .subscribe();
  }

  ionViewWillEnter() {
    this.ordersQuery.selectAll()
      .subscribe(
        orders => {
          console.log('Orders coming in', orders);
          this.orders = orders;
        },
      );
  }

  fetchOrders() {
    return this.ordersService.fetchAll({
      userId: this.sessionQuery.getValue().id
    });
  }

}
