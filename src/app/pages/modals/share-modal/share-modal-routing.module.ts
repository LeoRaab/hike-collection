import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareModalPage } from './share-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ShareModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareModalPageRoutingModule {}
