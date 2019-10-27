import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { PropertiesPopoverComponent } from 'src/app/components/properties-popover/properties-popover.component';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
})
export class FilterButtonComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  async present(ev: any) {
    console.log("**** Presenting a popOver");
    const popover = await this.popoverController.create({
      component: PropertiesPopoverComponent,
      event: ev,
      // translucent: true
    });

    return await popover.present();
  }

}
