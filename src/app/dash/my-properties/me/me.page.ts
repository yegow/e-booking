import { Component, OnInit } from '@angular/core';

import { PropertiesQuery } from 'src/app/store/properties.query';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  properties: any[] = null;

  constructor(
    private proeprtiesQuery: PropertiesQuery,
  ) { }

  ngOnInit() {
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

}
