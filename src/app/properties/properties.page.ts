import { Component, OnInit } from '@angular/core';

import { PropertiesService } from '../services/properties.service';
import { Property } from '../schemas/property';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  properties: Property[] = null;

  constructor(
    private propertiesService: PropertiesService,
    private stateService: StateService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.propertiesService.fetchProperties({})
      .subscribe(
        resp => { this.properties = resp.body.result; },
        error => { this.stateService.changeMessage(error.message); }
      );
  }

}
