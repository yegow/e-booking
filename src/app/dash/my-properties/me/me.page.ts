import { Component, OnInit } from '@angular/core';

import { PropertiesService } from 'src/app/services/properties.service';
import { StateService } from 'src/app/services/state.service';
import { Property } from 'src/app/schemas/property';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  properties: Property[] = null;

  constructor(
    private propertiesService: PropertiesService,
    private stateService: StateService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('View My Properties entering');
    this.propertiesService.fetchProperties({})
      .subscribe(
        resp => {
          this.properties = resp.body.result;
        },
        error => { this.stateService.changeMessage(error.message); }
      );
  }

}
