import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FilterButtonComponent } from './filter-button.component';
import { PropertiesPopoverComponent }
  from 'src/app/components/properties-popover/properties-popover.component';

@NgModule({
  declarations: [FilterButtonComponent, PropertiesPopoverComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents: [PropertiesPopoverComponent],
  exports: [FilterButtonComponent]
})
export class FilterButtonModule { }
