import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface OrdersState extends EntityState<Order> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'orders' })
export class OrdersStore extends EntityStore<OrdersState> {

  constructor() {
    super();
  }

}

