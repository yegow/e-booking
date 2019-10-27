import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MyPropertiesPage } from './my-properties.page';
import { MyPropertiesPageRoutingModule } from './my-properties-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPropertiesPageRoutingModule
  ],
  declarations: [MyPropertiesPage]
})
export class MyPropertiesPageModule {}
