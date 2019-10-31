import { Component, OnInit } from '@angular/core';

import { PropertiesQuery } from 'src/app/store/properties.query';
import { PropertiesService } from 'src/app/services/properties.service';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  properties: any[] = null;

  constructor(
    private proeprtiesQuery: PropertiesQuery,
    private propertiesService: PropertiesService,
    private sessionQuery: SessionQuery
  ) { }

  ngOnInit() {
    this.fetchProperties();
  }

  ionViewWillEnter() {
    console.log('View My Properties entering');
    this.proeprtiesQuery.properties$
      .subscribe(
        properties => {
          this.properties = properties;
        },
      );
  }

  fetchProperties() {
    this.propertiesService.fetchProperties({
      userId: this.sessionQuery.getValue().id,
      active: null
    });
  }

}
