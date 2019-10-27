import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PropertiesPage } from './properties.page';
import { PropertyListModule } from 'src/app/modules/property-list/property-list.module';
import { FilterButtonModule } from 'src/app/modules/filter-button/filter-button.module';

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
    FilterButtonModule
  ],
  declarations: [PropertiesPage]
})
export class PropertiesPageModule {}
