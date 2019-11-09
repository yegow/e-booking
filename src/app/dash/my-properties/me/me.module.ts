import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MePage } from './me.page';
import { PropertyListModule } from 'src/app/modules/property-list/property-list.module';
import { FilterButtonModule } from 'src/app/modules/filter-button/filter-button.module';
import { PostReviewPageModule } from './post-review/post-review.module';
import { PostReviewPage } from './post-review/post-review.page';
import { ReviewButtonComponent } from './review-button/review-button.component';

const routes: Routes = [
  {
    path: '',
    component: MePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PropertyListModule,
    FilterButtonModule,
    PostReviewPageModule,
  ],
  declarations: [MePage, ReviewButtonComponent],
  entryComponents: [PostReviewPage]
})
export class MePageModule {}
