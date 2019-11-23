import { Injectable } from '@angular/core';
import { Property, VISIBILITY_FILTER } from './property.model';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';

export interface PropertiesState extends EntityState<Property>, ActiveState {
  ui: {
    filter: VISIBILITY_FILTER,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'properties' })
export class PropertiesStore extends EntityStore<PropertiesState> {

  constructor() {
    super({
      ui: {
        filter: VISIBILITY_FILTER.SHOW_ALL,
      }
    });
  }

}
