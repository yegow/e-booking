import { Injectable } from '@angular/core';
import { Property } from './property.model';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';

export interface PropertiesState extends EntityState<Property>, ActiveState {
  userId?: string; // flag for various filtering
  type?: string;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'properties' })
export class PropertiesStore extends EntityStore<PropertiesState> {

  constructor() {
    super();
  }

}
