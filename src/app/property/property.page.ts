import { Component, OnInit } from '@angular/core';

import { PropertiesQuery } from '../store/properties.query';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage implements OnInit {
  property: any = null;
  reviews: any[] = null;

  constructor(
    private propertiesQuery: PropertiesQuery,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.propertiesQuery.activeProperty$
      .subscribe(
        (property) => { this.property = property; }
      );
  }

  order() {
    this.ordersService.order(this.property.id);
  }

}
