import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { PropertiesStore, PropertiesState } from './properties.store';
import { VISIBILITY_FILTER } from './property.model';

@Injectable({ providedIn: 'root' })
export class PropertiesQuery extends QueryEntity<PropertiesState> {
  selectVisiblityFilter$ = this.select(state => state.ui.filter);

  activeProperty$ = this.routerQuery.selectParams('id')
    .pipe(
      switchMap(id => this.selectEntity(id))
    );

  constructor(
    protected store: PropertiesStore,
    private routerQuery: RouterQuery
  ) {
    super(store);
  }

  // tslint:disable-next-line: deprecation
  properties$ = combineLatest(
    this.selectVisiblityFilter$,
    this.selectAll(),
    this.getVisibleProperties,
  );

  private getVisibleProperties(
    filter: string, properties: PropertiesState[]
    ): PropertiesState[] {
      switch (filter) {
        case VISIBILITY_FILTER.SHOW_FOR_SALE:
          console.log('Filtered by sale', properties);
          return properties.filter(p => p.type === 'Sale');
        case VISIBILITY_FILTER.SHOW_RENTAL:
          return properties.filter(p => p.type === 'Rent');
        default:
          return properties;
      }
    }

}
