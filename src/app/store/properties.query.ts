import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { switchMap } from 'rxjs/operators';

import { PropertiesStore, PropertiesState } from './properties.store';

@Injectable({ providedIn: 'root' })
export class PropertiesQuery extends QueryEntity<PropertiesState> {
  properties$ = this.selectAll();
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

}
