import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PropertyListComponent } from './property-list.component';
import { SkeletonComponent } from 'src/app/components/skeleton/skeleton.component';
import { PropertyItemComponent } from './property-item/property-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
  declarations: [PropertyListComponent, SkeletonComponent, PropertyItemComponent],
  exports: [PropertyListComponent]
})
export class PropertyListModule {}
