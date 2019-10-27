import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { PropertiesPopoverComponent } from '../components/properties-popover/properties-popover.component';
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
    private popoverController: PopoverController,
    private propertiesService: PropertiesService,
    private stateService: StateService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.propertiesService.fetchProperties()
      .subscribe(
        resp => { this.properties = resp.body.result; },
        error => { this.stateService.changeMessage(error.message); }
      );
  }

  async present(ev: any) {
    const popover = await this.popoverController.create({
      component: PropertiesPopoverComponent,
      event: ev,
      // translucent: true
    });

    return await popover.present();
  }

}
