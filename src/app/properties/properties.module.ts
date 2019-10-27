import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PropertiesPage } from './properties.page';
import { PropertiesPopoverComponent } from '../components/properties-popover/properties-popover.component';
import { PropertyListModule } from '../modules/property-list/property-list.module';

const routes: Routes = [
  {
    path: '',
    component: PropertiesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PropertyListModule,
  ],
  entryComponents: [
    PropertiesPopoverComponent
  ],
  declarations: [PropertiesPage, PropertiesPopoverComponent]
})
export class PropertiesPageModule {}
