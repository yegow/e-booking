import { Component, OnInit } from '@angular/core';

import { PropertiesQuery } from 'src/app/store/properties.query';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  properties: any[] = null;

  constructor(
    private propertiesQuery: PropertiesQuery,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.propertiesQuery.properties$
      .subscribe(
        properties => { this.properties = properties; }
      );
  }

}
