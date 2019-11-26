import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { PropertiesPopoverComponent } from 'src/app/components/properties-popover/properties-popover.component';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
})
export class FilterButtonComponent implements OnInit {
  constructor(
    private popoverController: PopoverController,
    private propertiesService: PropertiesService,
  ) { }

  ngOnInit() {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PropertiesPopoverComponent,
      event: ev,
      componentProps: {
        showAll: this.showAll,
        showForSale: this.showForSale,
        showForRental: this.showRental,
      }
      // translucent: true
    });

    return await popover.present();
  }

  showAll = () => {
    this.propertiesService.updateFilter('All');
  }

  showRental = () => {
    this.propertiesService.updateFilter('Rent');
  }

  showForSale = () => {
    this.propertiesService.updateFilter('Sale');
  }

}
