import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DashPage } from './dash.page';
import { DashPageRoutingModule } from './dash-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashPageRoutingModule
  ],
  declarations: [DashPage]
})
export class DashPageModule {}
