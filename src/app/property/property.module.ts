import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PropertyPage } from './property.page';
import { CheckoutPageModule } from './checkout/checkout.module';
import { CheckoutPage } from './checkout/checkout.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CheckoutPageModule,
  ],
  declarations: [PropertyPage],
  entryComponents: [CheckoutPage]
})
export class PropertyPageModule {}
