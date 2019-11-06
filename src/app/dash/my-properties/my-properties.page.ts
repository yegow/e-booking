import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { SessionQuery } from 'src/app/store/session.query';
import * as momment from 'moment';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.page.html',
  styleUrls: ['./my-properties.page.scss'],
})
export class MyPropertiesPage implements OnInit {

  constructor(
    private ordersService: OrdersService,
    private sessionQuery: SessionQuery,
  ) { }

  ngOnInit() {
    this.fetchOrders()
      .subscribe();
  }

  fetchOrders() {
    return this.ordersService.fetchAll({
      userId: this.sessionQuery.getValue().id
    });
  }
}
