import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PropertiesPopoverComponent } from '../properties-popover/properties-popover.component';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
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
