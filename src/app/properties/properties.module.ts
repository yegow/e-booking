import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PropertiesPage } from './properties.page';
import { PropertiesPopoverComponent } from '../properties-popover/properties-popover.component';

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
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    PropertiesPopoverComponent
  ],
  declarations: [PropertiesPage, PropertiesPopoverComponent]
})
export class PropertiesPageModule {}
