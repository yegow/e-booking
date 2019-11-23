import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MyPropertiesStore, MyPropertiesState } from './my-properties.store';

@Injectable({ providedIn: 'root' })
export class MyPropertiesQuery extends QueryEntity<MyPropertiesState> {

  constructor(protected store: MyPropertiesStore) {
    super(store);
  }

}
