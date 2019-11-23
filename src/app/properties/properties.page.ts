import { Component, OnInit } from '@angular/core';

import { PropertiesQuery } from '../store/properties.query';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  properties: any[];

  constructor(
    private propertiesQuery: PropertiesQuery,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit() {
    console.log('ngOnInit called');
    this.propertiesService.fetchProperties().subscribe();
  }

  ionViewWillEnter() {
    this.propertiesQuery.properties$
      .subscribe(
        properties => { this.properties = properties; }
      );
  }

  fetchProperties() {
    this.propertiesService.fetchProperties();
  }

}
