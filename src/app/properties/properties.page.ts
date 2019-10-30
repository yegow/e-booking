import { Component, OnInit } from '@angular/core';

import { PropertiesQuery } from '../store/properties.query';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  properties: any[];

  constructor(
    private proeprtiesQuery: PropertiesQuery
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.proeprtiesQuery.properties$
      .subscribe(
        properties => { this.properties = properties; }
      );
  }

}
