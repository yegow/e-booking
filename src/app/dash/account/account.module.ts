import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account.page';
import { AccountPopoverComponent } from 'src/app/components/account-popover/account-popover.component';
import { EditAccountPageModule } from '../edit-account/edit-account.module';
import { EditAccountPage } from '../edit-account/edit-account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    EditAccountPageModule
  ],
  entryComponents: [AccountPopoverComponent, EditAccountPage],
  declarations: [AccountPage, AccountPopoverComponent]
})
export class AccountPageModule {}
