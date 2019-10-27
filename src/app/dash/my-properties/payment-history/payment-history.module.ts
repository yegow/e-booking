import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentHistoryPage } from './payment-history.page';
import { FilterButtonModule } from 'src/app/modules/filter-button/filter-button.module';

const routes: Routes = [
  {
    path: '',
    component: PaymentHistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FilterButtonModule
  ],
  declarations: [PaymentHistoryPage]
})
export class PaymentHistoryPageModule {}
