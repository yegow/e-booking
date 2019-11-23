import { Injectable } from '@angular/core';
import { Property } from './property.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface MyPropertiesState extends EntityState<Property> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'my-properties' })
export class MyPropertiesStore extends EntityStore<MyPropertiesState> {

  constructor() {
    super();
  }

}

