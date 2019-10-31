import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PropertyPage } from './property.page';
import { PostReviewPageModule } from './post-review/post-review.module';
import { PostReviewPage } from './post-review/post-review.page';

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
    PostReviewPageModule
  ],
  declarations: [PropertyPage],
  entryComponents: [PostReviewPage]
})
export class PropertyPageModule {}
